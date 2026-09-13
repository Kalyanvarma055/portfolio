/* Kalyan Varma — Portfolio runtime (vanilla port of the original React app) */
(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var coarsePointer = window.matchMedia("(pointer: coarse)").matches;

  /* ------------------------------ Data ------------------------------ */

  var socials = [
    { name: "GitHub", link: "https://github.com/Kalyanvarma055" },
    { name: "LinkedIn", link: "https://www.linkedin.com/in/kalyanvarmalokam/" }
  ];

  var socialIcons = {
    GitHub: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.28-.01-1.02-.02-2-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.28 0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z"/></svg>',
    LinkedIn: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z"/></svg>'
  };

  var experience = [
    {
      company: "AIG (American International Group)", location: "New Jersey, USA", title: "AI Software Engineer", period: "Aug 2025 — Present",
      points: [
        "Built AI-assisted claims triage on Palantir AIP Logic and AIP Studio — LLM-driven document classification and risk-flag extraction across 500K+ annual claims, cutting manual review workload by 45%.",
        "Developed end-to-end Foundry workflows with Automations, Data Lineage, AIP Logic, Actions, and Schedules to automate claims routing, policy change triggers, and risk escalations with full traceability.",
        "Built and maintained 30+ Pipeline Builder and Code Workbook (PySpark) pipelines ingesting claims, policy, and actuarial data from mainframes, REST APIs, and S3 — data onboarding down from weeks to days.",
        "Wrote TypeScript Foundry Functions for risk scoring, premium calculations, and exposure aggregations, exposed as reusable Actions for Workshop apps and Ontology pipelines.",
        "Shipped Workshop operational apps and Slate executive dashboards giving adjusters, underwriters, and the C-suite live views of risk exposure and claims KPIs.",
        "Stabilized production LLM workflows — diagnosing prompt drift, model output failures, and pipeline errors — and added proactive SLA alerting so operations catch issues in minutes, not days."
      ],
      projects: ["AI-assisted claims triage (AIP Logic + Studio)", "30+ Foundry ingestion pipelines", "Workshop apps + Slate executive dashboards", "Submission lifecycle monitoring & SLA alerting"],
      tags: ["Palantir Foundry", "AIP", "TypeScript", "PySpark", "Ontology", "Workshop", "LLM workflows"]
    },
    {
      company: "EverBank", location: "New Jersey, USA", title: "Data Scientist", period: "Aug 2024 — Jul 2025",
      points: [
        "Built the analytical data foundation for risk and finance modeling on AWS — an S3 data lake at 5M+ daily transactions, curated into feature-ready Redshift datasets with Glue PySpark and dbt.",
        "Engineered borrower, payment-history, and macroeconomic features with WOE/IV binning and point-in-time correctness, so training data reflected what was actually known at scoring time.",
        "Developed probability-of-default models for the consumer and mortgage portfolio, benchmarking XGBoost against a logistic regression scorecard and explaining score drivers with SHAP.",
        "Built deposit attrition models on balance volatility, transaction frequency, and rate sensitivity — calibrated probabilities so treasury could threshold on expected runoff.",
        "Established validation and monitoring with MLflow, Great Expectations, and PSI/KS drift checks, documenting assumptions and results for model risk governance and audit.",
        "Productionized scoring on Airflow (AWS MWAA) across 20+ upstream sources including FIS, Fiserv, and Bloomberg, with quality gates that halt runs on upstream anomalies."
      ],
      projects: ["Probability-of-default models (consumer + mortgage)", "Deposit attrition model for treasury", "Risk & finance data lake on AWS", "Model validation & drift monitoring"],
      tags: ["Python", "XGBoost", "Scorecards", "SHAP", "MLflow", "Airflow", "Redshift", "dbt"]
    },
    {
      company: "Blackbuck Engineers", location: "Hyderabad, India", title: "Data Engineer", period: "Jan 2020 — Jul 2022",
      points: [
        "Built an end-to-end Student Data Platform on AWS, ingesting 1M+ daily events from TaPTaP, BBX Swift, and assessment APIs into an S3 data lake with Glue and Kinesis.",
        "Built a Databricks Delta Lake lakehouse (bronze/silver/gold) with Structured Streaming and Auto Loader across 500+ colleges and 100K+ students, cutting data prep time by 65%.",
        "Designed real-time Kinesis + Lambda streaming pipelines for live student activity, giving placement officers at 200+ institutions sub-minute dashboards and alerts.",
        "Modeled analytics-ready star schemas in Redshift with dbt, surfaced through Databricks SQL and Tableau for cohort, skill-score, and recruiter-demand analysis.",
        "Orchestrated 50+ daily Airflow (MWAA) pipeline runs with Great Expectations quality checks, reducing pipeline failures by 40%.",
        "Provisioned AWS infrastructure with Terraform and secured Databricks workspaces with cluster policies, table ACLs, and IAM passthrough across 100K+ student records."
      ],
      projects: ["Student Data Platform on AWS", "Delta Lake medallion lakehouse", "Real-time placement dashboards", "Terraform-provisioned data infrastructure"],
      tags: ["AWS", "Databricks", "Delta Lake", "Kinesis", "Airflow", "dbt", "Terraform", "Tableau"]
    }
  ];

  var certifications = [
    { title: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services", tags: ["AWS", "Architecture"] },
    { title: "Microsoft Certified: Azure Data Engineer Associate", issuer: "Microsoft", tags: ["Azure", "Data Engineering"] },
    { title: "AWS Certified Machine Learning Engineer – Associate", issuer: "Amazon Web Services", tags: ["AWS", "Machine Learning"] },
    { title: "The Data Science Course: Complete Data Science Bootcamp", issuer: "Udemy", tags: ["Data Science"] },
    { title: "Machine Learning A-Z: Hands-on Python", issuer: "Udemy", tags: ["Machine Learning", "Python"] }
  ];

  var processSteps = [
    { title: "Frame the decision", body: "Start from the decision the model informs — provisioning, underwriting policy, claims routing — and turn open-ended questions into testable analyses." },
    { title: "Build the data foundation", body: "Consolidate source systems into curated, point-in-time-correct feature sets with Spark, dbt, and Airflow, with quality gates that halt on bad inputs." },
    { title: "Model, validate, explain", body: "Benchmark XGBoost against scorecard baselines, calibrate outputs, explain drivers with SHAP, and document assumptions for model risk review." },
    { title: "Productionize & monitor", body: "Ship scoring and LLM workflows with MLflow, Foundry, and scheduled pipelines, then track PSI, KS, and drift so production stays honest." }
  ];

  var skills = [
    { name: "Python", link: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "SQL", link: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg" },
    { name: "TypeScript", link: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "scikit-learn", link: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg" },
    { name: "XGBoost", link: "https://raw.githubusercontent.com/dmlc/dmlc.github.io/master/img/logo-m/xgboost.png" },
    { name: "PySpark / Spark", link: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachespark/apachespark-original.svg" },
    { name: "Apache Airflow", link: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apacheairflow/apacheairflow-original.svg" },
    { name: "Databricks", link: "https://cdn.simpleicons.org/databricks/FF3621" },
    { name: "AWS", link: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
    { name: "Azure", link: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
    { name: "Google Cloud", link: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
    { name: "Palantir Foundry / AIP", link: "https://cdn.simpleicons.org/palantir/5AA0E8" },
    { name: "MLflow", link: "https://cdn.simpleicons.org/mlflow/0194E2" },
    { name: "Docker", link: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "Terraform", link: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" },
    { name: "Apache Kafka", link: "https://cdn.simpleicons.org/apachekafka/5AA0E8" },
    { name: "Tableau", link: "https://cdn.worldvectorlogo.com/logos/tableau-software.svg" },
    { name: "Git", link: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-plain.svg" }
  ];

  var marqueeItems = ["Credit risk models", "Python", "PySpark", "Palantir Foundry", "AIP", "XGBoost", "Scorecards", "Airflow", "Databricks", "AWS", "LLM workflows", "MLflow", "Model validation"];

  var greetings = ["Hello", "Bonjour", "नमस्ते", "Ciao", "Olá", "Hallo", "Hola", "こんにちは"];


  /* --------------------------- Helpers ------------------------------ */

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function heliumAttrs(name, duration, delay) {
    var opts = { viewSettings: { once: true }, transitionSettings: { duration: duration } };
    if (delay) opts.transitionSettings.delay = delay;
    return 'data-helium-animation="' + name + '" data-helium-animation-trigger="view" data-helium-animation-options=\'' + JSON.stringify(opts) + "'";
  }

  /* --------------------------- Renderers ---------------------------- */

  function renderSocials() {
    document.querySelectorAll(".js-social").forEach(function (wrap) {
      wrap.innerHTML = socials.map(function (s) {
        return '<a href="' + s.link + '" target="_blank" rel="noreferrer" aria-label="' + esc(s.name) + '" class="magnetic social-link" title="' + esc(s.name) + '">' + socialIcons[s.name] + "</a>";
      }).join("");
    });
  }

  function renderMarquee() {
    var track = document.getElementById("marquee-track");
    var items = marqueeItems.concat(marqueeItems);
    track.innerHTML = items.map(function (t) {
      return '<span class="marquee__item">' + esc(t) + '<span class="marquee__dot"></span></span>';
    }).join("");
  }

  function renderExperience() {
    var list = document.getElementById("experience-list");
    list.innerHTML = experience.map(function (e, i) {
      return '<li class="experience__item" ' + heliumAttrs("slideInUp", 0.7, 0.05 * i) + ">" +
        '<div class="experience__meta"><span class="experience__period">' + esc(e.period) + '</span><span class="experience__location">' + esc(e.location) + "</span></div>" +
        '<div class="experience__body"><h3>' + esc(e.title) + "<span> · " + esc(e.company) + "</span></h3>" +
        "<ul>" + e.points.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul>" +
        '<div class="experience__projects"><strong>Key work</strong><ul>' + e.projects.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul></div>" +
        '<div class="experience__tags">' + e.tags.map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("") + "</div>" +
        "</div></li>";
    }).join("");

    var certs = document.getElementById("certifications");
    certs.innerHTML = certifications.map(function (c) {
      return '<li><div><span class="experience__project-title">' + esc(c.title) + "</span><p>" + esc(c.issuer) + '</p><div class="experience__tags">' + c.tags.map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("") + "</div></div></li>";
    }).join("");
  }

  function renderProcess() {
    var list = document.getElementById("process-list");
    list.innerHTML = processSteps.map(function (s, i) {
      return '<li class="process__item" ' + heliumAttrs("slideInUp", 0.7, 0.08 * i) + ">" +
        '<span class="process__num">' + String(i + 1).padStart(2, "0") + "</span>" +
        "<h3>" + esc(s.title) + "</h3><p>" + esc(s.body) + '</p><i class="process__line" aria-hidden="true"></i></li>';
    }).join("");
  }

  function renderSkills() {
    var list = document.getElementById("skill-list");
    list.innerHTML = skills.map(function (s) {
      return '<li><img src="' + s.link + '" alt="" width="28" height="28"/><span>' + esc(s.name) + "</span></li>";
    }).join("");
  }

  /* ---------------------- Helium animation runtime ------------------- */

  var ANIMATIONS = {
    fade: { animation: { opacity: [0, 1] }, transitionSettings: { duration: 1, easing: [0.16, 1, 0.3, 1] } },
    blurScaleIn: { animation: { opacity: [0, 1], filter: ["blur(10px)", "blur(0px)"], transform: ["scale(0.9)", "scale(1)"] }, transitionSettings: {} },
    bottomFadeIn: { animation: { opacity: [0, 1], translateY: [100, 0] }, transitionSettings: { duration: 0.5 } },
    widthExpand: { animation: { scaleX: [0, 1], opacity: [0, 1] }, transitionSettings: { duration: 2, easing: [0.16, 1, 0.3, 1] } },
    revealLeftToRight: { animation: { clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"], opacity: [0, 1] }, transitionSettings: { duration: 1.2, easing: [0.22, 1, 0.36, 1] } },
    revealRightToLeft: { animation: { clipPath: ["inset(0 0 0 100%)", "inset(0 0 0 0)"], opacity: [0, 1] }, transitionSettings: { duration: 1.2, easing: [0.22, 1, 0.36, 1] } },
    revealTopToBottom: { animation: { clipPath: ["inset(0 0 100% 0)", "inset(0 0 0 0)"], opacity: [0, 1] }, transitionSettings: { duration: 1.2, easing: [0.22, 1, 0.36, 1] } },
    revealBottomToTop: { animation: { clipPath: ["inset(100% 0 0 0)", "inset(0 0 0 0)"], opacity: [0, 1] }, transitionSettings: { duration: 1.2, easing: [0.22, 1, 0.36, 1] } },
    textRevealUp: { animation: { y: ["100%", "0%"], opacity: [0, 1] }, transitionSettings: { duration: 1, easing: [0.16, 1, 0.3, 1] } },
    textRevealDown: { animation: { y: ["-100%", "0%"], opacity: [0, 1] }, transitionSettings: { duration: 1, easing: [0.16, 1, 0.3, 1] } },
    textRevealLeft: { animation: { x: ["-100%", "0%"], opacity: [0, 1] }, transitionSettings: { duration: 1, easing: [0.16, 1, 0.3, 1] } },
    textRevealRight: { animation: { x: ["100%", "0%"], opacity: [0, 1] }, transitionSettings: { duration: 1, easing: [0.16, 1, 0.3, 1] } },
    slideInLeft: { animation: { x: [-50, 0], opacity: [0, 1] }, transitionSettings: { duration: 1.2, easing: [0.22, 1, 0.36, 1] } },
    slideInRight: { animation: { x: [50, 0], opacity: [0, 1] }, transitionSettings: { duration: 1.2, easing: [0.22, 1, 0.36, 1] } },
    slideInUp: { animation: { y: [50, 0], opacity: [0, 1] }, transitionSettings: { duration: 1.2, easing: [0.22, 1, 0.36, 1] } },
    slideInDown: { animation: { y: [-50, 0], opacity: [0, 1] }, transitionSettings: { duration: 1.2, easing: [0.22, 1, 0.36, 1] } }
  };

  function toTransform(key, v) {
    var val = typeof v === "number" ? v + "px" : v;
    if (key === "y" || key === "translateY") return "translateY(" + val + ")";
    if (key === "x" || key === "translateX") return "translateX(" + val + ")";
    if (key === "scale") return "scale(" + v + ")";
    if (key === "scaleX") return "scaleX(" + v + ")";
    if (key === "scaleY") return "scaleY(" + v + ")";
    return null;
  }

  function buildKeyframes(anim) {
    var count = 0;
    Object.keys(anim).forEach(function (k) {
      if (Array.isArray(anim[k])) count = Math.max(count, anim[k].length);
    });
    var frames = [];
    for (var i = 0; i < count; i++) {
      var frame = {};
      Object.keys(anim).forEach(function (k) {
        var arr = anim[k];
        if (!Array.isArray(arr)) return;
        var v = arr[Math.min(i, arr.length - 1)];
        if (k === "opacity") frame.opacity = v;
        else if (k === "filter") frame.filter = v;
        else if (k === "clipPath") frame.clipPath = v;
        else if (k === "transform") frame.transform = v;
        else {
          var t = toTransform(k, v);
          if (t) frame.transform = frame.transform ? frame.transform + " " + t : t;
        }
      });
      frames.push(frame);
    }
    return frames;
  }

  function applyInitial(el, anim) {
    var frames = buildKeyframes(anim);
    if (!frames.length) return;
    var f = frames[0];
    if ("opacity" in f) el.style.opacity = f.opacity;
    if ("filter" in f) el.style.filter = f.filter;
    if ("clipPath" in f) el.style.clipPath = f.clipPath;
    if ("transform" in f) el.style.transform = f.transform;
  }

  function easingCss(e) {
    if (Array.isArray(e)) return "cubic-bezier(" + e.join(",") + ")";
    if (e === "easeInOut") return "ease-in-out";
    if (e === "easeIn") return "ease-in";
    if (e === "easeOut") return "ease-out";
    return "cubic-bezier(0.22, 1, 0.36, 1)";
  }

  function parseConfig(el) {
    var name = el.getAttribute("data-helium-animation");
    var base = ANIMATIONS[name] || {};
    var opts = {};
    try { opts = JSON.parse(el.getAttribute("data-helium-animation-options") || "{}"); } catch (err) {}
    var animation = Object.assign({}, base.animation, opts.animation);
    var ts = Object.assign({}, base.transitionSettings, opts.transitionSettings);
    var viewSettings = Object.assign({ once: true }, opts.viewSettings);
    return { animation: animation, transition: ts, viewSettings: viewSettings };
  }

  function runAnimation(el, cfg) {
    var frames = buildKeyframes(cfg.animation);
    if (!frames.length) return;
    var last = frames[frames.length - 1];
    var duration = (cfg.transition.duration || 0.8) * 1000;
    var delay = (cfg.transition.delay || 0) * 1000;
    try {
      var a = el.animate(frames, { duration: duration, delay: delay, easing: easingCss(cfg.transition.easing), fill: "both" });
      a.onfinish = function () {
        if ("opacity" in last) el.style.opacity = last.opacity;
        if ("filter" in last) el.style.filter = last.filter;
        if ("clipPath" in last) el.style.clipPath = last.clipPath;
        el.style.transform = "transform" in last ? last.transform : "none";
        a.cancel();
      };
    } catch (err) {
      forceVisible(el);
    }
  }

  function forceVisible(el) {
    el.style.opacity = "1";
    el.style.filter = "none";
    el.style.transform = "none";
    el.style.clipPath = "none";
  }

  function heliumPrepare() {
    if (reducedMotion) return;
    document.querySelectorAll("[data-helium-animation]").forEach(function (el) {
      var cfg = parseConfig(el);
      applyInitial(el, cfg.animation);
    });
  }

  function heliumInit() {
    if (reducedMotion) {
      document.querySelectorAll("[data-helium-animation]").forEach(forceVisible);
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          observer.unobserve(el);
          runAnimation(el, parseConfig(el));
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0 });

    document.querySelectorAll("[data-helium-animation]").forEach(function (el) {
      if (el.getAttribute("data-helium-animation-added") === "true") return;
      el.setAttribute("data-helium-animation-added", "true");
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
        requestAnimationFrame(function () { runAnimation(el, parseConfig(el)); });
      } else {
        observer.observe(el);
      }
    });
  }

  /* --------------------------- Preloader ----------------------------- */

  function startPreloader(onDone) {
    var pre = document.getElementById("preloader");
    var count = document.getElementById("preloader-count");
    var bar = document.getElementById("preloader-bar");
    var finished = false;

    function finish() {
      if (finished) return;
      finished = true;
      count.textContent = "100";
      bar.style.width = "100%";
      pre.classList.add("is-leaving");
      setTimeout(function () {
        pre.parentNode && pre.parentNode.removeChild(pre);
        onDone();
      }, 700);
    }

    if (reducedMotion) { finish(); return; }

    var progress = 0;
    var interval = setInterval(function () {
      progress += Math.floor(Math.random() * 10) + 6;
      if (progress >= 100) {
        clearInterval(interval);
        finish();
      } else {
        count.textContent = String(progress).padStart(3, "0");
        bar.style.width = progress + "%";
      }
    }, 35);
    setTimeout(finish, 2800);
  }

  /* ------------------------------ Theme ------------------------------ */

  var sunSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  var moonSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M21 14.5A8.5 8.5 0 0 1 9.5 3 7 7 0 1 0 21 14.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>';

  function isDark() {
    return document.documentElement.getAttribute("data-theme") !== "light";
  }

  function refreshThemeUI() {
    var dark = isDark();
    document.querySelectorAll(".js-theme-toggle").forEach(function (btn) {
      btn.innerHTML = dark ? sunSvg : moonSvg;
      btn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
      btn.setAttribute("title", dark ? "Light mode" : "Dark mode");
    });
    document.querySelectorAll(".js-theme-toggle-block").forEach(function (btn) {
      btn.textContent = dark ? "Light mode" : "Dark mode";
    });
    document.querySelectorAll(".hamburger-bar").forEach(function (b) {
      b.style.background = dark ? "#e8eef7" : "#0f172a";
    });
  }

  function toggleTheme() {
    var next = isDark() ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("portfolio-theme", next); } catch (err) {}
    document.querySelectorAll("[data-helium-animation]").forEach(function (el) {
      el.style.opacity = "1";
      el.style.filter = "none";
    });
    refreshThemeUI();
  }

  function initTheme() {
    document.querySelectorAll(".js-theme-toggle, .js-theme-toggle-block").forEach(function (btn) {
      btn.addEventListener("click", toggleTheme);
    });
    refreshThemeUI();
  }

  /* --------------------- Hamburger + mobile drawer -------------------- */

  var drawerOpen = false;

  function initHamburger() {
    var holder = document.getElementById("mobile-toggle");
    var burger = document.createElement("div");
    burger.className = "hamburger-react";
    burger.setAttribute("role", "button");
    burger.setAttribute("tabindex", "0");
    burger.setAttribute("aria-label", "Menu");
    burger.style.cssText = "cursor:pointer;height:48px;position:relative;transition:0.4s cubic-bezier(0,0,0,1);user-select:none;width:48px;outline:none;";
    var tops = [17, 23, 29];
    var bars = tops.map(function (top) {
      var bar = document.createElement("div");
      bar.className = "hamburger-bar";
      bar.style.cssText = "position:absolute;height:2px;width:20px;left:14px;top:" + top + "px;transition:0.4s cubic-bezier(0,0,0,1);background:" + (isDark() ? "#e8eef7" : "#0f172a") + ";";
      burger.appendChild(bar);
      return bar;
    });

    function render() {
      var move = 4.23;
      burger.style.transform = drawerOpen ? "rotate(-90deg)" : "none";
      bars[0].style.transform = drawerOpen ? "rotate(-45deg) translate(-" + move + "px, " + move + "px)" : "none";
      bars[1].style.transform = drawerOpen ? "scaleX(0)" : "none";
      bars[2].style.transform = drawerOpen ? "rotate(45deg) translate(-" + move + "px, -" + move + "px)" : "none";
    }

    function toggle() {
      drawerOpen = !drawerOpen;
      render();
      var drawer = document.getElementById("nav-drawer");
      if (drawerOpen) {
        drawer.hidden = false;
        drawer.animate([{ opacity: 0, transform: "translateY(-12px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 250, fill: "both" });
      } else {
        var a = drawer.animate([{ opacity: 1, transform: "translateY(0)" }, { opacity: 0, transform: "translateY(-12px)" }], { duration: 250, fill: "both" });
        a.onfinish = function () { drawer.hidden = true; };
      }
    }

    burger.addEventListener("click", toggle);
    burger.addEventListener("keyup", function (e) { if (e.key === "Enter") toggle(); });
    holder.appendChild(burger);

    document.querySelectorAll("#nav-drawer .js-scroll").forEach(function (link) {
      link.addEventListener("click", function () { if (drawerOpen) toggle(); });
    });
  }

  /* ------------------- Nav scroll state + smooth scroll ---------------- */

  function initNav() {
    var nav = document.getElementById("nav");
    function onScroll() {
      nav.classList.toggle("is-scrolled", window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    document.querySelectorAll(".js-scroll").forEach(function (link) {
      link.addEventListener("click", function (e) {
        var target = document.getElementById(link.getAttribute("data-target"));
        if (!target) return;
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top: Math.max(0, top), behavior: reducedMotion ? "auto" : "smooth" });
      });
    });

    var spyLinks = Array.prototype.slice.call(document.querySelectorAll(".js-spy"));
    function spy() {
      var active = null;
      spyLinks.forEach(function (link) {
        var section = document.getElementById(link.getAttribute("data-target"));
        if (!section) return;
        var rect = section.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom > 120) active = link;
      });
      spyLinks.forEach(function (link) {
        link.classList.toggle("is-active", link === active);
      });
    }
    spy();
    window.addEventListener("scroll", spy, { passive: true });
  }

  /* --------------------------- Hero extras ---------------------------- */

  function initGreeting() {
    var el = document.getElementById("greeting");
    if (reducedMotion) return;
    var index = 0;
    setInterval(function () {
      el.className = "greeting-cycle is-out";
      setTimeout(function () {
        index = (index + 1) % greetings.length;
        el.textContent = greetings[index];
        el.className = "greeting-cycle is-in";
      }, 320);
    }, 2200);
  }

  function initTilt() {
    var panel = document.getElementById("hero-panel");
    if (!panel || reducedMotion || coarsePointer) return;
    panel.addEventListener("mousemove", function (e) {
      var rect = panel.getBoundingClientRect();
      var rx = (e.clientX - rect.left) / rect.width - 0.5;
      var ry = (e.clientY - rect.top) / rect.height - 0.5;
      panel.style.transform = "perspective(1000px) rotateY(" + rx * 8 + "deg) rotateX(" + ry * -8 + "deg) translateZ(0)";
    });
    panel.addEventListener("mouseleave", function () {
      panel.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0)";
    });
  }

  function initMagnetic() {
    if (reducedMotion || coarsePointer) return;
    document.querySelectorAll("[data-magnetic]").forEach(function (el) {
      var strength = parseFloat(el.getAttribute("data-magnetic")) || 0.35;
      el.addEventListener("mousemove", function (e) {
        var rect = el.getBoundingClientRect();
        var x = e.clientX - (rect.left + rect.width / 2);
        var y = e.clientY - (rect.top + rect.height / 2);
        el.style.transform = "translate(" + x * strength + "px, " + y * strength + "px)";
      });
      el.addEventListener("mouseleave", function () {
        el.style.transform = "translate(0, 0)";
      });
    });
  }

  /* --------------------------- Custom cursor -------------------------- */

  function initCursor() {
    if (reducedMotion || coarsePointer) return;
    document.documentElement.classList.add("has-custom-cursor");
    var dot = document.createElement("div");
    dot.className = "cursor-dot";
    dot.setAttribute("aria-hidden", "true");
    var ring = document.createElement("div");
    ring.className = "cursor-ring";
    ring.setAttribute("aria-hidden", "true");
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    var tx = window.innerWidth / 2, ty = window.innerHeight / 2;
    var rx = tx, ry = ty;
    var hovering = false, active = false;

    window.addEventListener("mousemove", function (e) {
      tx = e.clientX;
      ty = e.clientY;
      if (!active) {
        active = true;
        dot.classList.add("is-active");
        ring.classList.add("is-active");
      }
      dot.style.left = tx + "px";
      dot.style.top = ty + "px";
    }, { passive: true });

    document.addEventListener("mouseover", function (e) {
      hovering = Boolean(e.target.closest("a, button, .magnetic, .project-row, .btn, input, textarea, label"));
      ring.classList.toggle("is-hover", hovering);
    });

    (function loop() {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      ring.style.setProperty("--cursor-scale", hovering ? "1.7" : "1");
      requestAnimationFrame(loop);
    })();
  }

  /* --------------------------- Scroll progress ------------------------ */

  function initScrollProgress() {
    var bar = document.getElementById("scroll-progress-bar");
    function update() {
      var total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + "%";
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* ------------------------------ Clock ------------------------------- */

  function initClock() {
    var el = document.getElementById("clock");
    function tick() {
      el.textContent = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true, timeZoneName: "short"
      }).format(new Date());
    }
    tick();
    setInterval(tick, 1000);
  }

  /* --------------------------- Contact form --------------------------- */

  function initContactForm() {
    var form = document.getElementById("contact-form");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.elements.name.value;
      var email = form.elements.email.value;
      var message = form.elements.message.value;
      var subject = encodeURIComponent("Portfolio note from " + name);
      var body = encodeURIComponent(message + "\n\n— " + name + "\n" + email);
      window.location.href = "mailto:kalyanvarmalokam55@gmail.com?subject=" + subject + "&body=" + body;
    });
  }

  /* ------------------------------- Boot ------------------------------- */

  document.addEventListener("DOMContentLoaded", function () {
    renderSocials();
    renderMarquee();
    renderExperience();
    renderProcess();
    renderSkills();

    document.getElementById("footer-year").textContent = new Date().getFullYear();

    heliumPrepare();
    initTheme();
    initHamburger();
    initNav();
    initClock();
    initContactForm();

    startPreloader(function () {
      document.getElementById("app-shell").classList.add("is-ready");
      setTimeout(heliumInit, 60);
      setTimeout(heliumInit, 400);
      initGreeting();
      initTilt();
      initMagnetic();
      initCursor();
      initScrollProgress();
    });
  });
})();
