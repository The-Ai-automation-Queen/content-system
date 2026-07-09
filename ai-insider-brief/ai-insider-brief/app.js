/* ============================================================
   THE INSIDER BRIEF — Dashboard JavaScript
   Single file, no framework, no dependencies
   ============================================================ */

// ============================================================
// STATE
// ============================================================
let allCards = [];
let currentCategory = 'all';
let activeTopicFilter = null;
let isSubscribed = false;

// Shared alias map — used by extractTopics and filterByTopic
var TOPIC_ALIASES = {
  'chatgpt': 'OpenAI', 'gpt-5': 'OpenAI', 'openai': 'OpenAI',
  'claude': 'Anthropic', 'claude sonnet 4.6': 'Anthropic', 'opus': 'Anthropic',
  'anthropic': 'Anthropic',
  'gemini': 'Google', 'google': 'Google',
  'copilot': 'Microsoft', 'microsoft': 'Microsoft',
  'text-to-speech': 'Voice AI', 'voice agents': 'Voice AI',
  'ai agents': 'AI Agents', 'ai assistants': 'AI Agents',
  'data privacy': 'Privacy', 'data protection': 'Privacy',
  'privacy risks': 'Privacy', 'privacy concerns': 'Privacy',
  'data security': 'Privacy', 'data policy': 'Privacy',
  'eu ai act': 'AI Regulation', 'compliance': 'AI Regulation',
  'ai ethics': 'AI Regulation', 'tech governance': 'AI Regulation',
  'ai safety': 'AI Regulation',
  'canva': 'Adobe', 'adobe': 'Adobe',
  'healthcare': 'Healthcare AI', 'ai healthcare': 'Healthcare AI',
  'healthcare automation': 'Healthcare AI', 'fetal monitoring': 'Healthcare AI',
  'seo': 'Marketing AI', 'content marketing': 'Marketing AI',
  'ad targeting': 'Marketing AI', 'social media ai': 'Marketing AI',
  'proptech': 'Real Estate AI', 'property tech': 'Real Estate AI',
  'housing market': 'Real Estate AI', 'home valuation': 'Real Estate AI',
  'fintech': 'Finance AI', 'banking ai': 'Finance AI',
  'robo-advisor': 'Finance AI', 'fraud detection': 'Finance AI',
  'edtech': 'Education AI', 'ai tutoring': 'Education AI',
  'online learning': 'Education AI', 'ai classroom': 'Education AI',
  'journalism ai': 'Media AI', 'newsroom': 'Media AI',
  'ai publishing': 'Media AI', 'media automation': 'Media AI'
};

// ============================================================
// MODULE A: Data Loading
// ============================================================

async function loadBriefs() {
  try {
    var res = await fetch('data/briefs.json');
    if (!res.ok) throw new Error('Failed to load briefs');
    var data = await res.json();
    allCards = (data.cards || []).sort(function (a, b) {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
    return allCards;
  } catch (err) {
    console.error('Error loading briefs:', err);
    allCards = [];
    return allCards;
  }
}

// ============================================================
// MODULE A2: Dormancy guard — never let the page look stale by accident
// ============================================================

var STALE_THRESHOLD_DAYS = 10;

function updateFeedStatus(cards) {
  var statusEl = document.getElementById('feed-status');
  if (!statusEl) return;

  if (!cards || cards.length === 0) {
    statusEl.style.display = 'none';
    return;
  }

  var newestTimestamp = null;
  cards.forEach(function (card) {
    var t = new Date(card.timestamp);
    if (!isNaN(t.getTime()) && (!newestTimestamp || t > newestTimestamp)) {
      newestTimestamp = t;
    }
  });

  if (!newestTimestamp) {
    statusEl.style.display = 'none';
    return;
  }

  var ageDays = (Date.now() - newestTimestamp.getTime()) / (1000 * 60 * 60 * 24);

  if (ageDays > STALE_THRESHOLD_DAYS) {
    statusEl.textContent = 'From the archive';
    statusEl.style.display = 'block';
  } else {
    // Fresh board: keep current behavior, no extra framing label.
    statusEl.style.display = 'none';
  }
}

// ============================================================
// MODULE A3: Past issues — proves the Tuesday cadence even when
// the live feed is thin. Tolerates a missing data/archive.json.
// ============================================================

async function loadAndRenderArchive() {
  var container = document.getElementById('past-issues');
  if (!container) return;

  var raw;
  try {
    var res = await fetch('data/archive.json');
    if (!res.ok) return; // no archive file yet — stay silent, do not fabricate
    raw = await res.json();
  } catch (err) {
    return; // network or parse failure — stay silent
  }

  var entries = raw && (raw.issues || raw.archive || raw);
  if (!Array.isArray(entries) || entries.length === 0) return;

  var dates = entries
    .map(function (item) {
      if (typeof item === 'string') return item;
      if (item && item.date) return item.date;
      return null;
    })
    .filter(Boolean);

  if (dates.length === 0) return;

  container.textContent = '';

  var label = document.createElement('p');
  label.className = 'past-issues-label';
  label.textContent = 'Past issues';
  container.appendChild(label);

  var list = document.createElement('ul');
  list.className = 'past-issues-list';
  dates.forEach(function (d) {
    var li = document.createElement('li');
    li.textContent = d;
    list.appendChild(li);
  });
  container.appendChild(list);

  container.style.display = 'block';
}

// ============================================================
// MODULE B: Topic Bubble Extraction and Rendering
// ============================================================

function extractTopics(cards) {
  var aliases = TOPIC_ALIASES;

  // Drop vague topics that add no signal
  var blocked = {
    'ai interaction': 1, 'multilingual': 1, 'human-ai collaboration': 1,
    'business strategy': 1, 'business success': 1, 'business growth': 1,
    'business efficiency': 1, 'operational efficiency': 1, 'efficiency': 1,
    'efficiency gains': 1, 'ai innovation': 1, 'ai integration': 1,
    'ai adoption': 1, 'ai tools': 1, 'advanced models': 1, 'ai models': 1,
    'tech strategy': 1, 'industry standards': 1, 'controlled growth': 1,
    'market leadership': 1, 'market opportunities': 1, 'productivity': 1,
    'personalization': 1, 'cost savings': 1, 'user experience': 1,
    'workflow efficiency': 1, 'workflow management': 1, 'chatgpt usage': 1,
    'customer trust': 1, 'global talent': 1
  };

  var counts = {};
  cards.forEach(function (card) {
    if (!card.topics || !Array.isArray(card.topics)) return;
    card.topics.forEach(function (topic) {
      var key = topic.toLowerCase();
      if (blocked[key]) return;
      var canonical = aliases[key] || topic;
      var cKey = canonical.toLowerCase();
      if (!counts[cKey]) {
        counts[cKey] = { topic: canonical, count: 0 };
      }
      counts[cKey].count++;
    });
  });

  var sorted = Object.values(counts).sort(function (a, b) {
    return b.count - a.count;
  });

  return sorted.slice(0, 8);
}

function renderBubbles(topics) {
  var container = document.getElementById('topic-bubbles');
  if (!container) return;
  container.textContent = '';

  var placed = [];

  topics.forEach(function (item) {
    var bubble = document.createElement('div');
    bubble.className = 'topic-bubble';
    bubble.textContent = item.topic;

    if (item.count >= 3) {
      bubble.classList.add('size-lg');
    } else if (item.count === 1) {
      bubble.classList.add('size-sm');
    }

    // Find a position along the edges — avoid center content area
    var top, left;
    var attempts = 0;
    var tooClose = true;

    while (tooClose && attempts < 30) {
      top = 5 + Math.random() * 85;
      // Push to left or right edge — avoid center 30-70% zone
      if (Math.random() < 0.5) {
        left = Math.random() * 25;          // left edge 0-25%
      } else {
        left = 75 + Math.random() * 20;     // right edge 75-95%
      }
      tooClose = false;

      for (var i = 0; i < placed.length; i++) {
        var dx = (left - placed[i].left) * (container.offsetWidth || 800) / 100;
        var dy = (top - placed[i].top) * (container.offsetHeight || 400) / 100;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          tooClose = true;
          break;
        }
      }
      attempts++;
    }

    placed.push({ top: top, left: left });

    bubble.style.position = 'absolute';
    bubble.style.top = top + '%';
    bubble.style.left = left + '%';

    // Set CSS custom properties for unique float animation
    var floatDuration = 15 + Math.random() * 15;
    var floatDelay = Math.random() * 10;
    bubble.style.setProperty('--float-duration', floatDuration + 's');
    bubble.style.setProperty('--float-delay', floatDelay + 's');
    bubble.style.setProperty('--drift-x', (Math.random() * 60 - 30) + 'px');
    bubble.style.setProperty('--drift-y', (Math.random() * 50 - 25) + 'px');
    bubble.style.setProperty('--drift-x2', (Math.random() * 50 - 25) + 'px');
    bubble.style.setProperty('--drift-y2', (Math.random() * 40 - 20) + 'px');
    bubble.style.setProperty('--drift-x3', (Math.random() * 60 - 30) + 'px');
    bubble.style.setProperty('--drift-y3', (Math.random() * 50 - 25) + 'px');

    // Click handler: filter feed by this topic
    bubble.addEventListener('click', function () {
      filterByTopic(item.topic);
    });

    container.appendChild(bubble);
  });
}

function filterByTopic(topic) {
  activeTopicFilter = topic;

  // Scroll to feed
  var feed = document.getElementById('feed');
  if (feed) {
    feed.scrollIntoView({ behavior: 'smooth' });
  }

  // Reset category pills to "All"
  var pills = document.querySelectorAll('.category-pill');
  pills.forEach(function (p) { p.classList.remove('active'); });
  var allPill = document.querySelector('.category-pill[data-category="all"]');
  if (allPill) allPill.classList.add('active');
  currentCategory = 'all';

  // Filter cards by topic — resolve aliases so clicking "OpenAI" matches ChatGPT, GPT-5, etc.
  var canonicalTarget = topic.toLowerCase();
  var filtered = allCards.filter(function (card) {
    if (!card.topics || !Array.isArray(card.topics)) return false;
    return card.topics.some(function (t) {
      var resolved = (TOPIC_ALIASES[t.toLowerCase()] || t).toLowerCase();
      return resolved === canonicalTarget;
    });
  });

  renderFeed(filtered);
  showTopicIndicator(topic);
}

function showTopicIndicator(topic) {
  removeTopicIndicator();

  var feed = document.getElementById('feed');
  var indicator = document.createElement('div');
  indicator.className = 'topic-filter-indicator';
  indicator.id = 'topic-indicator';

  var label = document.createElement('span');
  label.textContent = 'Showing: ' + topic;

  var clearBtn = document.createElement('button');
  clearBtn.className = 'topic-filter-clear';
  clearBtn.textContent = '\u00D7';
  clearBtn.setAttribute('aria-label', 'Clear topic filter');
  clearBtn.addEventListener('click', function () {
    clearTopicFilter();
  });

  indicator.appendChild(label);
  indicator.appendChild(clearBtn);

  feed.parentNode.insertBefore(indicator, feed);
}

function removeTopicIndicator() {
  var existing = document.getElementById('topic-indicator');
  if (existing) existing.remove();
}

function clearTopicFilter() {
  activeTopicFilter = null;
  removeTopicIndicator();
  renderFeed(allCards);
}

// ============================================================
// MODULE C: Card Rendering
// ============================================================

function createCardElement(card, index) {
  var el = document.createElement('div');
  el.className = 'feed-card';
  el.setAttribute('data-category', card.category);
  if (card.category === 'Breaking') {
    el.classList.add('breaking');
  }
  el.id = card.id;
  el.style.animationDelay = (index * 60) + 'ms';

  // Card header
  var header = document.createElement('div');
  header.className = 'card-header';

  var badge = document.createElement('span');
  badge.className = 'category-badge';
  badge.textContent = card.category;

  var timestamp = document.createElement('span');
  timestamp.className = 'card-timestamp';
  timestamp.textContent = card.date;

  header.appendChild(badge);
  header.appendChild(timestamp);

  // Headline
  var headline = document.createElement('h3');
  headline.className = 'card-headline';
  headline.textContent = card.headline;

  // Narrative
  var narrative = document.createElement('p');
  narrative.className = 'card-narrative';
  narrative.textContent = card.narrative;

  // Verdict bar
  var verdictBar = document.createElement('div');
  verdictBar.className = 'verdict-bar verdict-' + card.verdict.toLowerCase();

  var verdictLabel = document.createElement('div');
  verdictLabel.className = 'verdict-label';
  verdictLabel.textContent = card.verdict;

  var verdictText = document.createElement('div');
  verdictText.className = 'verdict-text';
  verdictText.textContent = card.verdict_text;

  verdictBar.appendChild(verdictLabel);
  verdictBar.appendChild(verdictText);

  // Footer
  var footer = document.createElement('div');
  footer.className = 'card-footer';

  // Source link — show source name if available
  if (card.source_url) {
    var sourceLink = document.createElement('a');
    sourceLink.className = 'source-link';
    sourceLink.href = card.source_url;
    sourceLink.target = '_blank';
    sourceLink.rel = 'noopener noreferrer';
    sourceLink.textContent = card.source_name || 'Read source';
    footer.appendChild(sourceLink);
  }

  // Assemble card
  el.appendChild(header);
  el.appendChild(headline);
  el.appendChild(narrative);
  el.appendChild(verdictBar);
  el.appendChild(footer);

  return el;
}

var GATE_LIMIT = 5;

function renderFeed(cards) {
  var feed = document.getElementById('feed');
  var gate = document.getElementById('content-gate');
  feed.textContent = '';

  if (!cards || cards.length === 0) {
    var empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = 'Nothing here right now. That is a good sign.';
    feed.appendChild(empty);
    if (gate) gate.style.display = 'none';
    return;
  }

  var shouldGate = !isSubscribed && cards.length > GATE_LIMIT;

  // When gated, ensure at least one ACT card is in the visible set
  var displayCards = cards;
  if (shouldGate) {
    var visibleSlice = cards.slice(0, GATE_LIMIT);
    var hasAct = visibleSlice.some(function (c) { return c.verdict === 'ACT'; });
    if (!hasAct) {
      var actIndex = -1;
      for (var j = GATE_LIMIT; j < cards.length; j++) {
        if (cards[j].verdict === 'ACT') { actIndex = j; break; }
      }
      if (actIndex > -1) {
        displayCards = cards.slice();
        var swapped = displayCards[GATE_LIMIT - 1];
        displayCards[GATE_LIMIT - 1] = displayCards[actIndex];
        displayCards[actIndex] = swapped;
      }
    }
  }

  var limit = shouldGate ? GATE_LIMIT + 1 : displayCards.length;

  for (var i = 0; i < limit && i < displayCards.length; i++) {
    var cardEl = createCardElement(displayCards[i], i);

    if (shouldGate && i === GATE_LIMIT) {
      cardEl.classList.add('gated-fade');
    }

    feed.appendChild(cardEl);
  }

  // Show or hide the content gate
  if (gate) {
    gate.style.display = shouldGate ? 'block' : 'none';
  }
}

function groupByDate(cards) {
  var now = new Date();
  var todayStr = formatDateDMY(now);
  var yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  var yesterdayStr = formatDateDMY(yesterday);

  var map = {};
  var order = [];

  cards.forEach(function (card) {
    var key = card.date;
    if (!map[key]) {
      map[key] = [];
      order.push(key);
    }
    map[key].push(card);
  });

  return order.map(function (dateKey) {
    var label = dateKey;
    if (dateKey === todayStr) label = 'Today';
    else if (dateKey === yesterdayStr) label = 'Yesterday';
    return { label: label, cards: map[dateKey] };
  });
}

function formatDateDMY(date) {
  var d = String(date.getDate()).padStart(2, '0');
  var m = String(date.getMonth() + 1).padStart(2, '0');
  var y = date.getFullYear();
  return d + '/' + m + '/' + y;
}

// ============================================================
// MODULE D: Category Filtering
// ============================================================

function updateCategoryPillVisibility(cards) {
  var present = new Set();
  cards.forEach(function (c) { if (c.category) present.add(c.category); });
  var pills = document.querySelectorAll('.category-pill');
  pills.forEach(function (pill) {
    var cat = pill.getAttribute('data-category');
    if (cat === 'all') return;
    pill.style.display = present.has(cat) ? '' : 'none';
  });
}

function initCategoryFilters() {
  var pills = document.querySelectorAll('.category-pill');
  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      // Clear any active topic filter
      if (activeTopicFilter) {
        activeTopicFilter = null;
        removeTopicIndicator();
      }

      pills.forEach(function (p) { p.classList.remove('active'); });
      pill.classList.add('active');
      currentCategory = pill.getAttribute('data-category');

      var filtered;
      if (currentCategory === 'all') {
        filtered = allCards;
      } else {
        filtered = allCards.filter(function (card) {
          return card.category === currentCategory;
        });
      }
      renderFeed(filtered);
    });
  });
}

// ============================================================
// MODULE E: Share
// ============================================================

function shareCard(cardId) {
  var url = window.location.href.split('#')[0] + '#' + cardId;

  if (navigator.share) {
    navigator.share({
      title: 'The Insider Brief',
      url: url
    }).catch(function () {
      copyAndToast(url);
    });
  } else {
    copyAndToast(url);
  }
}

function copyAndToast(url) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(function () {
      showToast('Link copied');
    }).catch(function () {
      fallbackCopy(url);
      showToast('Link copied');
    });
  } else {
    fallbackCopy(url);
    showToast('Link copied');
  }
}

function fallbackCopy(text) {
  var textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

function showToast(message) {
  var toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(function () {
    toast.classList.remove('show');
  }, 2000);
}

// ============================================================
// MODULE F: Scroll Behaviors
// ============================================================

function initScrollBehaviors() {
  var btn = document.querySelector('.scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================================
// MODULE G: Auto-Refresh
// ============================================================

function initAutoRefresh() {
  setInterval(async function () {
    try {
      var res = await fetch('data/briefs.json');
      if (!res.ok) return;
      var data = await res.json();
      var newCards = (data.cards || []).sort(function (a, b) {
        return new Date(b.timestamp) - new Date(a.timestamp);
      });

      var existingIds = {};
      allCards.forEach(function (c) { existingIds[c.id] = true; });

      var added = newCards.filter(function (c) { return !existingIds[c.id]; });

      if (added.length > 0) {
        allCards = added.concat(allCards);

        // Refresh pill visibility — newly added categories may need to appear
        updateCategoryPillVisibility(allCards);

        // Re-render current view
        if (activeTopicFilter) {
          filterByTopic(activeTopicFilter);
        } else if (currentCategory === 'all') {
          renderFeed(allCards);
        } else {
          var filtered = allCards.filter(function (c) {
            return c.category === currentCategory;
          });
          renderFeed(filtered);
        }

        // Update bubbles with new topic data
        var topics = extractTopics(allCards);
        renderBubbles(topics);

        // Re-check dormancy now that fresher cards have arrived
        updateFeedStatus(allCards);

        showToast(added.length + ' new brief' + (added.length > 1 ? 's' : ''));
      }
    } catch (e) {
      // Silent fail on auto-refresh
    }
  }, 300000);
}

// ============================================================
// MODULE H: Shimmer Loading
// ============================================================

function showShimmerLoading() {
  var feed = document.getElementById('feed');
  for (var i = 0; i < 3; i++) {
    var shimmer = document.createElement('div');
    shimmer.className = 'shimmer-card';

    var line1 = document.createElement('div');
    line1.className = 'shimmer-line short';
    var line2 = document.createElement('div');
    line2.className = 'shimmer-line medium';
    var line3 = document.createElement('div');
    line3.className = 'shimmer-line long';

    shimmer.appendChild(line1);
    shimmer.appendChild(line2);
    shimmer.appendChild(line3);
    feed.appendChild(shimmer);
  }
}

function removeShimmerLoading() {
  var feed = document.getElementById('feed');
  var shimmers = feed.querySelectorAll('.shimmer-card');
  shimmers.forEach(function (el) { el.remove(); });
}

// ============================================================
// MODULE I: GHL Form Submission
// ============================================================

function getSelectedFrequency(form) {
  // Find the frequency toggle associated with this form
  var parent = form.parentElement;
  var toggle = parent.querySelector('.frequency-toggle');
  if (!toggle) return 'weekly';
  var checked = toggle.querySelector('input[type="radio"]:checked');
  return checked ? checked.value : 'weekly';
}

function initFrequencyToggles() {
  var toggles = document.querySelectorAll('.frequency-toggle');
  toggles.forEach(function (toggle) {
    var options = toggle.querySelectorAll('.freq-option');
    options.forEach(function (opt) {
      opt.addEventListener('click', function () {
        options.forEach(function (o) { o.classList.remove('freq-active'); });
        opt.classList.add('freq-active');
        var radio = opt.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;
      });
    });
  });
}

function initForms() {
  var forms = document.querySelectorAll('[data-form-id]');
  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var email = form.querySelector('input[name="email"]').value;
      var formId = form.getAttribute('data-form-id');
      var source = form.getAttribute('data-source');
      var frequency = getSelectedFrequency(form);
      var btn = form.querySelector('button');
      var originalText = btn.textContent;

      var gotcha = form.querySelector('input[name="_gotcha"]');
      if (gotcha && gotcha.value) { btn.textContent = 'You are in!'; return; }

      btn.textContent = 'Sending...';
      btn.disabled = true;

      // Estate-wide GHL visibility: every capture surface (main-site ribbon,
      // guides opt-ins, store notify forms) dual-posts to Formspree + the
      // n8n webhook so GHL is the single source of truth for subscribers,
      // regardless of which form or which property they used. The Brief
      // keeps sending through its own ESP below; this just makes the
      // subscriber visible in GHL with a source tag.
      fetch('https://formspree.io/f/xgojoyka', {
        method: 'POST', keepalive: true,
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email: email, source: source || 'brief' })
      });
      fetch('https://auto.shiftandlead.com/webhook/formspree-lead', {
        method: 'POST', keepalive: true,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, source: source || 'brief' })
      });

      fetch('https://api.convertkit.com/v3/forms/9318060/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: 'bvkVWvPgYeSP4-QJr0NGiw',
          email: email,
          tags: [],
          fields: { frequency: frequency }
        })
      })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.subscription) {
          form.querySelector('input[name="email"]').value = '';
          btn.textContent = 'You are in!';
          btn.classList.add('btn-success');
          showToast('Check your inbox (or spam) to confirm your subscription');

          // Unlock gated content
          isSubscribed = true;
          localStorage.setItem('insider-brief-subscribed', '1');
          var gate = document.getElementById('content-gate');
          if (gate) gate.style.display = 'none';

          // Re-render feed without gate
          if (activeTopicFilter) {
            filterByTopic(activeTopicFilter);
          } else if (currentCategory === 'all') {
            renderFeed(allCards);
          } else {
            var catFiltered = allCards.filter(function (c) {
              return c.category === currentCategory;
            });
            renderFeed(catFiltered);
          }

          // Add confirmation message below the form
          var existingMsg = form.parentElement.querySelector('.confirm-msg');
          if (!existingMsg) {
            var msg = document.createElement('p');
            msg.className = 'confirm-msg';
            msg.textContent = 'Check your inbox to confirm your subscription. It might be in your spam folder.';
            form.parentElement.insertBefore(msg, form.nextSibling);
          }

          setTimeout(function () {
            btn.textContent = originalText;
            btn.classList.remove('btn-success');
            btn.disabled = false;
          }, 4000);
        } else {
          throw new Error('No subscription returned');
        }
      })
      .catch(function () {
        btn.textContent = originalText;
        btn.disabled = false;
        showToast('Something went wrong. Try again.');
      });
    });
  });
}

// ============================================================
// INIT
// ============================================================

document.addEventListener('DOMContentLoaded', async function () {
  // Check if visitor has already subscribed
  if (localStorage.getItem('insider-brief-subscribed') === '1') {
    isSubscribed = true;
  }

  showShimmerLoading();
  var cards = await loadBriefs();
  removeShimmerLoading();

  // Extract topics and render floating bubbles
  var topics = extractTopics(cards);
  renderBubbles(topics);

  // Render feed
  renderFeed(cards);

  // Dormancy honesty: label the board "From the archive" if the
  // newest card is more than 10 days old, instead of implying it's current.
  updateFeedStatus(cards);

  // Compact past-issues list, if an archive file exists (tolerates 404).
  loadAndRenderArchive();

  // Hide pills for categories with no cards
  updateCategoryPillVisibility(cards);

  // Init interactions
  initCategoryFilters();
  initScrollBehaviors();
  initAutoRefresh();
  initFrequencyToggles();
  initForms();
});
