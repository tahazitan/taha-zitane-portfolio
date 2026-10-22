"""Source of truth for the portfolio. Keep claims aligned to documentary evidence."""
PROFILE = {
    "name": "Taha Zitane",
    "location": "Chefchaouen, Morocco",
    "email": "zitanet44@gmail.com",
    "github": "https://github.com/tahazitan",
    "linkedin": "https://www.linkedin.com/in/taha-zitane/fr",
    "network_repo": "https://github.com/tahazitan/enterprise-network-lab",
}

EXPERIENCE = [
    {
        "date": "2025 — Present", "fr_date": "2025 — Aujourd'hui", "ar_date": "2025 — الآن",
        "role": {"en": "Systems & Network Support — Freelance", "fr": "Administration systèmes & réseaux / Support IT — Freelance", "ar": "دعم تقني وإدارة الأنظمة والشبكات — عمل مستقل"},
        "org": {"en": "Independent · Remote", "fr": "Indépendant · À distance", "ar": "مستقل · عن بُعد"},
        "text": {"en": "Remote workstation troubleshooting, software and peripheral support, and LAN/Wi-Fi/router configuration when required.", "fr": "Diagnostic à distance des postes, logiciels et périphériques ; configuration et dépannage LAN, Wi-Fi et routeurs selon les besoins.", "ar": "تشخيص أعطال الحواسيب والبرامج والأجهزة الطرفية عن بُعد، مع إعداد الشبكات المحلية والواي فاي والموجّهات حسب الحاجة."},
    },
    {
        "date": "Nov 2023 — Jan 2024", "fr_date": "11/2023 — 01/2024", "ar_date": "نونبر 2023 — يناير 2024",
        "role": {"en": "Network Technician — Internship", "fr": "Technicien réseaux informatiques — Stage", "ar": "متدرب تقني شبكات"},
        "org": {"en": "Mohammed V Hospital · Chefchaouen", "fr": "Hôpital Mohammed V · Chefchaouen", "ar": "مستشفى محمد الخامس · شفشاون"},
        "text": {"en": "Participated in Enova Santé network setup, user support, and reporting technical anomalies to the development team.", "fr": "Participation à la configuration du réseau Enova Santé, support utilisateurs et remontée des anomalies.", "ar": "المساهمة في إعداد شبكة Enova Santé ودعم المستخدمين ورفع الأعطال التقنية إلى فريق التطوير."},
    },
    {
        "date": "Aug — Oct 2023", "fr_date": "08/2023 — 10/2023", "ar_date": "غشت — أكتوبر 2023",
        "role": {"en": "Networking & Systems Trainer", "fr": "Formateur en réseaux et systèmes", "ar": "مكوّن في الشبكات والأنظمة"},
        "org": {"en": "ETIGA · Chefchaouen", "fr": "ETIGA · Chefchaouen", "ar": "ETIGA · شفشاون"},
        "text": {"en": "Delivered practical networking/systems sessions and supported learners' technical projects.", "fr": "Animation de travaux pratiques en réseaux et systèmes et accompagnement des projets des stagiaires.", "ar": "تقديم حصص تطبيقية في الشبكات والأنظمة ومواكبة المشاريع التقنية للمتدربين."},
    },
    {
        "date": "May — Jul 2023", "fr_date": "05/2023 — 07/2023", "ar_date": "ماي — يوليوز 2023",
        "role": {"en": "IT Support / ITSM — Emailing Platforms", "fr": "Support IT / ITSM — Plateformes emailing", "ar": "الدعم التقني وإدارة التذاكر — منصات المراسلة"},
        "org": {"en": "Operating Media SARL · Tangier", "fr": "Operating Media SARL · Tanger", "ar": "Operating Media SARL · طنجة"},
        "text": {"en": "Ticket and incident handling, technical assistance for emailing platforms and contact data.", "fr": "Gestion de tickets et d'incidents ; assistance aux plateformes emailing et données de contacts.", "ar": "متابعة تذاكر الدعم والحوادث التقنية ومساعدة مستخدمي منصات البريد وبيانات الاتصال."},
    },
    {
        "date": "Apr 2022", "fr_date": "04/2022", "ar_date": "أبريل 2022",
        "role": {"en": "Systems & Network Administration — Internship", "fr": "Administration systèmes et réseaux — Stage", "ar": "تدريب في إدارة الأنظمة والشبكات"},
        "org": {"en": "Provincial Education Directorate · Chefchaouen", "fr": "Direction provinciale de l'Éducation nationale · Chefchaouen", "ar": "المديرية الإقليمية للتربية الوطنية · شفشاون"},
        "text": {"en": "Physical-server setup, Windows Server and Active Directory installation, and local network/workstation support.", "fr": "Installation de serveurs physiques, Windows Server et Active Directory ; support LAN et postes utilisateurs.", "ar": "تثبيت خوادم فعلية وWindows Server وActive Directory ودعم الشبكة المحلية وأجهزة المستخدمين."},
    },
    {
        "date": "May — Jun 2021", "fr_date": "05/2021 — 06/2021", "ar_date": "ماي — يونيو 2021",
        "role": {"en": "IT Operations — Internship", "fr": "Gestion informatique — Stage", "ar": "تدريب في خدمات المعلوميات"},
        "org": {"en": "Municipality of Chefchaouen", "fr": "Commune de Chefchaouen", "ar": "جماعة شفشاون"},
        "text": {"en": "Workstation and printer maintenance, software installation, and spreadsheet support.", "fr": "Maintenance de postes et imprimantes, installation de logiciels et travaux Excel.", "ar": "صيانة الحواسيب والطابعات وتثبيت البرامج والمساعدة في جداول البيانات."},
    }
]

PROJECTS = [
    {
        "slug": "enterprise-network-lab", "num":"01", "theme":"cyan", "icon":"network",
        "category": {"en":"NETWORK ENGINEERING", "fr":"INGÉNIERIE RÉSEAUX", "ar":"هندسة الشبكات"},
        "title": {"en":"Enterprise Multi-Site Network Lab", "fr":"Lab réseau d'entreprise multi-sites", "ar":"مختبر شبكة مؤسسية متعددة المواقع"},
        "desc": {"en":"Two-site HQ/Branch design with FRRouting, OSPF, segmentation, a WireGuard secure profile and repeatable test scripts. Live network validation is pending.",
                 "fr":"Maquette HQ/Branch avec FRRouting, OSPF, segmentation, profil sécurisé WireGuard et scripts de tests reproductibles. Validation réseau réelle à venir.",
                 "ar":"تصميم شبكة تربط المقر والفرع باستعمال FRRouting وOSPF وتقسيم الشبكة وWireGuard وسكريبتات اختبار قابلة للإعادة. التحقق الفعلي ما زال قيد الإنجاز."},
        "tags":["FRRouting", "OSPF", "802.1Q", "WireGuard", "Linux"],
        "status":"source", "github":"https://github.com/tahazitan/enterprise-network-lab"
    },
    {
        "slug": "windows-server-ad", "num":"02", "theme":"violet", "icon":"server",
        "category": {"en":"SYSTEMS ADMINISTRATION", "fr":"ADMINISTRATION SYSTÈMES", "ar":"إدارة الأنظمة"},
        "title": {"en":"Windows Server & Active Directory", "fr":"Windows Server & Active Directory", "ar":"Windows Server وActive Directory"},
        "desc": {"en":"Documentation of a 2022 physical-server internship: Windows Server and AD deployment. A modern reproducible lab with DNS, GPO and file shares is planned.",
                 "fr":"Retour d'expérience du stage de 2022 : installation de serveurs physiques, Windows Server et AD. Reconstruction moderne DNS/GPO/partages prévue.",
                 "ar":"توثيق تدريب 2022 حول الخوادم الفعلية وWindows Server وActive Directory، مع خطة لإعادة بناء مختبر حديث يشمل DNS وGPO ومشاركة الملفات."},
        "tags":["Windows Server", "Active Directory", "DNS", "GPO"], "status":"rebuild", "github":None
    },
    {
        "slug": "security-observability-labs", "num":"03", "theme":"amber", "icon":"shield",
        "category": {"en":"NETWORK SECURITY / MONITORING", "fr":"SÉCURITÉ / SUPERVISION", "ar":"أمن الشبكات والمراقبة"},
        "title": {"en":"Firewall & Security Monitoring Labs", "fr":"Labs pare-feu et supervision", "ar":"مختبرات الجدران النارية والمراقبة الأمنية"},
        "desc": {"en":"Hands-on learning labs involving FortiGate, Palo Alto, traffic analysis, Zabbix/SNMP, Wazuh and Snort. Evidence-backed individual case studies will follow.",
                 "fr":"Laboratoires d'apprentissage autour de FortiGate, Palo Alto, analyse du trafic, Zabbix/SNMP, Wazuh et Snort. Études de cas à documenter.",
                 "ar":"تجارب عملية في FortiGate وPalo Alto وتحليل حركة الشبكة وZabbix/SNMP وWazuh وSnort، مع إعداد دراسات حالة موثقة لاحقاً."},
        "tags":["FortiGate", "Palo Alto", "Zabbix", "Wazuh", "Snort"], "status":"practice", "github":None
    },
    {
        "slug":"remote-it-support", "num":"04", "theme":"cyan", "icon":"support",
        "category":{"en":"FIELD WORK / IT OPERATIONS", "fr":"EXPÉRIENCE / SUPPORT IT", "ar":"خبرة مهنية / الدعم التقني"},
        "title":{"en":"Remote IT Support & Troubleshooting", "fr":"Support IT à distance & diagnostic", "ar":"الدعم التقني عن بُعد وتشخيص الأعطال"},
        "desc":{"en":"Freelance support work since 2025: remote endpoint assistance, application and peripheral troubleshooting, and LAN/Wi-Fi configuration. Client-private data is not published.",
                "fr":"Missions de support indépendant depuis 2025 : téléassistance, diagnostic de postes, logiciels et périphériques et configuration LAN/Wi-Fi. Aucune donnée client publiée.",
                "ar":"مهام دعم تقني مستقل منذ 2025: المساعدة عن بُعد، تشخيص مشاكل الأجهزة والبرامج والطابعات، وإعداد الشبكات المحلية والواي فاي، دون نشر بيانات العملاء."},
        "tags":["Remote Support", "AnyDesk", "TCP/IP", "LAN / Wi-Fi", "ITSM"], "status":"experience", "github":None
    },
    {
        "slug":"hospital-network-support", "num":"05", "theme":"violet", "icon":"network",
        "category":{"en":"PROFESSIONAL INTERNSHIP", "fr":"STAGE PROFESSIONNEL", "ar":"تدريب مهني"},
        "title":{"en":"Hospital IT & Network Support", "fr":"Support informatique en milieu hospitalier", "ar":"دعم الشبكات والمعلوميات بالمستشفى"},
        "desc":{"en":"2023–24 internship at Hôpital Mohammed V, Chefchaouen: supported users, participated in networking for Enova Santé, and escalated reported application issues.",
                "fr":"Stage 2023–24 à l'Hôpital Mohammed V de Chefchaouen : support utilisateurs, participation au réseau Enova Santé et remontée d'anomalies applicatives.",
                "ar":"تدريب 2023–2024 بمستشفى محمد الخامس بشفشاون: دعم المستخدمين، والمساهمة في إعداد شبكة Enova Santé، وتبليغ الأعطال التطبيقية."},
        "tags":["User Support", "LAN", "Incident Escalation", "Healthcare IT"], "status":"internship", "github":None
    },
]

LOCALES = {
"en": {
    "code":"EN", "locale":"en_US", "language_name":"English", "dir":"ltr", "path":"/",
    "nav_label":"Main navigation", "nav_projects":"Projects", "nav_experience":"Experience", "nav_expertise":"Expertise", "nav_services":"Services", "nav_contact":"Contact",
    "availability":"Open to remote opportunities & freelance missions", "hero_kicker":"INFRASTRUCTURE  /  OPERATIONS  /  SECURITY",
    "hero_title_pre":"Engineering reliable", "hero_title_highlight":"infrastructure.",
    "hero_sub":"I build, operate and troubleshoot systems and networks—with a growing focus on enterprise security, monitoring and practical engineering evidence.",
    "hero_role":"Systems & Network Administration · Infrastructure Operations · Network Security",
    "view_work":"Explore projects", "contact_me":"Let's work together", "location":"Based in Chefchaouen, Morocco · Working remotely",
    "diagram_title":"NETWORK OPERATIONS / LAB TOPOLOGY", "diagram_sub":"HQ ↔ BRANCH · ROUTING & SECURITY", "diagram_hq":"HEADQUARTERS", "diagram_branch":"BRANCH", "diagram_security":"FIREWALL / VPN", "diagram_status":"PROJECT V1 · VALIDATION PENDING", "diagram_caption":"Architecture illustrative · not a live monitoring dashboard",
    "proof_intro":"What you'll find here", "proof_1_title":"Real experience", "proof_1_text":"Internships, support work and technical training.", "proof_2_title":"Reproducible labs", "proof_2_text":"Version-controlled configs, tests and runbooks.", "proof_3_title":"Honest validation", "proof_3_text":"Clear distinction between built, practiced and verified.",
    "section_projects_kicker":"01 / SELECTED WORK", "section_projects_title":"Projects with depth.", "section_projects_sub":"Not just a list of tools. Each case study explains the problem, architecture, configuration and evidence status.",
    "section_experience_kicker":"02 / FIELD EXPERIENCE", "section_experience_title":"From real support to infrastructure.", "section_experience_sub":"Hands-on internships and work experience, distinguished from independent learning labs.",
    "section_skills_kicker":"03 / TECHNICAL DOMAINS", "section_skills_title":"Operate. Troubleshoot. Secure.", "section_skills_sub":"Current practice areas and the disciplines I am advancing through hands-on projects.",
    "section_services_kicker":"04 / HOW I CAN HELP", "section_services_title":"Practical IT support, without the noise.", "section_services_sub":"Scope and availability are confirmed per assignment. No unsupported production credentials claimed.",
    "section_about_kicker":"BACKGROUND", "about_title":"Technical foundations. Continuous engineering.", "about_text":"Specialized Technician diploma in Computer Network Techniques from ISMO Tétouan (2022). One year of engineering studies in Informatics & Networks at EMSI Tangier (2024–2025, non-degree). Focused on developing deeper operational mastery through hands-on labs, troubleshooting and documented projects.",
    "service1":"Remote IT troubleshooting", "service1desc":"Workstation, application and peripheral diagnosis; practical end-user assistance.",
    "service2":"LAN / Wi-Fi & device setup", "service2desc":"Small-network configuration, IP addressing, router setup and fault isolation.",
    "service3":"Infrastructure lab & documentation", "service3desc":"Clear topology diagrams, configuration runbooks and structured technical reports for agreed scopes.",
    "skill1":"Networks & routing", "skill2":"Systems & virtualization", "skill3":"Security & observability", "skill4":"Support & operations",
    "skilltext1":"TCP/IP, OSPF, VLANs, IP planning, VPN and packet analysis", "skilltext2":"Windows Server, AD/GPO, Linux, Proxmox, backups", "skilltext3":"FortiGate/Palo Alto labs, Zabbix, Wazuh, Snort", "skilltext4":"Remote support, incident triage, troubleshooting, ITSM",
    "details":"View case study", "source":"View source on GitHub", "status_source":"Source published · live validation pending", "status_rebuild":"Past internship · lab reconstruction planned", "status_practice":"Hands-on practice · case studies pending",
    "status_experience":"Work history · CV documented", "status_internship":"Internship · CV documented",
    "contact_kicker":"05 / CONTACT", "contact_title":"Have an infrastructure problem to solve?", "contact_sub":"Available to discuss suitable remote IT support, network setup or technical collaboration. Reach me directly or connect on GitHub and LinkedIn.", "send_email":"Send an email", "github_label":"GitHub profile", "linkedin_label":"LinkedIn profile",
    "footer_note":"Built as a lightweight, dependency-free static site. Facts and verification status are stated carefully.", "footer_copyright":"All rights reserved.",
    "back":"Back to projects", "case_overview":"Project overview", "case_scope":"Scope & honest status", "case_evidence":"Evidence and next steps", "case_stage":"Project classification", "case_link":"Repository", "case_outcome":"What this work demonstrates", "case_next":"Next verification milestones",
    "other_projects":"Other engineering work", "lang_switch":"Choose language", "menu_open":"Open navigation", "menu_close":"Close navigation",
    "meta_desc":"Taha Zitane — Systems & Network Administration, Infrastructure Operations and Network Security. Verified work experience, practical IT labs and technical case studies.",
    "case_content":{
      "enterprise-network-lab": {
        "scope":"Designed and version-controlled a two-site enterprise network lab. The base profile contains FRRouting routers with OSPF area 0 and HQ/Branch connectivity checks; the secure profile adds VLAN tagging, Linux filtering and WireGuard. The source has been reviewed, but the live data-plane tests have not yet been performed on the target lab machine.",
        "outcome":"A reproducible network topology, routing configurations, test scripts, implementation notes, and a transparent verification plan.",
        "next":["Deploy the base topology on a Linux VM with Docker + Containerlab.","Confirm OSPF Full adjacency and expected learned routes.","Record real bidirectional ping, simulated WAN outage and restoration evidence.","Validate VLAN, firewall and WireGuard policy tests for the secure profile."]
      },
      "windows-server-ad":{
        "scope":"A historical internship in April 2022 at the provincial education directorate involved physical-server installation, Windows Server, Active Directory and workstation/LAN support. This page documents that experience; it does not imply that original employer configuration files or production screenshots were retained.",
        "outcome":"Exposure to practical Windows Server deployment and domain infrastructure support in a real institutional context.",
        "next":["Recreate an isolated modern Windows Server/Active Directory lab.","Implement DNS, organizational units, groups, GPOs and permissions.","Add file shares, backup/restore tests and a troubleshooting runbook.","Publish sanitized, newly captured lab proof separately from internship history."]
      },
      "security-observability-labs":{
        "scope":"Past self-directed labs include FortiGate and Palo Alto firewall practice; Wireshark analysis; Zabbix/SNMP monitoring; basic Wazuh SIEM; and Snort IDS/IPS. This is an inventory of practiced technologies, not a claim of enterprise production operation.",
        "outcome":"Broad practical exposure to network visibility, policy controls and security monitoring tools.",
        "next":["Choose one reproducible firewall case and document policy/packet-flow tests.","Build Zabbix monitoring with alert scenarios and actual screenshots.","Create a small Wazuh detection case with authorized lab event evidence.","Publish individual case studies only after hands-on validation."]
      },
      "remote-it-support": {
        "scope":"Freelance IT support and systems/network assistance since 2025, including remote user assistance, software and peripheral troubleshooting, LAN/Wi-Fi router setup and IP configuration according to client requirements. This is work-history documentation, not a public repository of client systems.",
        "outcome":"Demonstrates customer-facing diagnosis, structured incident investigation, communication and safe remote assistance. No invented response-time metrics, customer names or closed-ticket numbers.",
        "next":["Create a sanitized troubleshooting runbook for common DNS, DHCP and Wi-Fi issues.","Reproduce representative incidents in a safe test environment rather than sharing client environments.","Publish test steps, anonymized sample logs and practical root-cause explanations.","Build a transparent freelance service catalogue with scope and support boundaries."]
      },
      "hospital-network-support": {
        "scope":"Professional internship at Hôpital Mohammed V in Chefchaouen (Nov 2023–Jan 2024): user support, participation in networking for Enova Santé, and escalation of application issues. This is a summary of historical duties, not a claim to own or publish hospital infrastructure documentation.",
        "outcome":"Experience in operational support and structured issue escalation in a real institution, with attention to confidentiality.",
        "next":["Recreate a fictional healthcare LAN diagram with no real site details.","Document safe generic user-support and escalation workflows.","Practice VLAN and application-connectivity diagnostics in an isolated lab.","Publish a distinct lab case study when actual tests and evidence are available."]
      },
    }
},
"fr": {
    "code":"FR", "locale":"fr_FR", "language_name":"Français", "dir":"ltr", "path":"/fr/",
    "nav_label":"Navigation principale", "nav_projects":"Projets", "nav_experience":"Expérience", "nav_expertise":"Expertise", "nav_services":"Services", "nav_contact":"Contact",
    "availability":"Disponible pour des missions à distance et en freelance", "hero_kicker":"INFRASTRUCTURE  /  EXPLOITATION  /  SÉCURITÉ",
    "hero_title_pre":"Concevoir et exploiter une", "hero_title_highlight":"infrastructure fiable.",
    "hero_sub":"J'administre, dépanne et documente les systèmes et réseaux, avec un intérêt croissant pour la sécurité d'entreprise, la supervision et les preuves techniques.",
    "hero_role":"Administration Systèmes & Réseaux · Exploitation IT · Sécurité réseau",
    "view_work":"Voir les projets", "contact_me":"Travaillons ensemble", "location":"Basé à Chefchaouen, Maroc · Missions à distance",
    "diagram_title":"OPÉRATIONS RÉSEAU / TOPOLOGIE DE LAB", "diagram_sub":"SIÈGE ↔ AGENCE · ROUTAGE & SÉCURITÉ", "diagram_hq":"SIÈGE", "diagram_branch":"AGENCE", "diagram_security":"PARE-FEU / VPN", "diagram_status":"PROJET V1 · TESTS RÉELS EN ATTENTE", "diagram_caption":"Schéma illustratif · pas une supervision en temps réel",
    "proof_intro":"Ce que vous trouverez ici", "proof_1_title":"Expérience terrain", "proof_1_text":"Stages, support et formation technique.", "proof_2_title":"Labs reproductibles", "proof_2_text":"Configurations, scripts de tests et procédures.", "proof_3_title":"Validation transparente", "proof_3_text":"Distinction claire entre code, pratique et résultats vérifiés.",
    "section_projects_kicker":"01 / TRAVAUX SÉLECTIONNÉS", "section_projects_title":"Des projets techniques approfondis.", "section_projects_sub":"Au-delà des outils : problème, architecture, configurations et état des preuves.",
    "section_experience_kicker":"02 / EXPÉRIENCE TERRAIN", "section_experience_title":"Du support à l'infrastructure.", "section_experience_sub":"Stages et expériences professionnelles, séparés des laboratoires personnels.",
    "section_skills_kicker":"03 / DOMAINES TECHNIQUES", "section_skills_title":"Exploiter. Diagnostiquer. Sécuriser.", "section_skills_sub":"Mes domaines de pratique et de progression à travers des projets concrets.",
    "section_services_kicker":"04 / SERVICES", "section_services_title":"Un support IT pragmatique.", "section_services_sub":"Le périmètre et la disponibilité sont confirmés pour chaque mission.",
    "section_about_kicker":"PARCOURS", "about_title":"Une base technique et une progression continue.", "about_text":"Diplôme de Technicien Spécialisé en Techniques des Réseaux Informatiques, ISMO Tétouan (2022). Une année suivie en cycle ingénieur Informatique et Réseaux à l'EMSI Tanger (2024–2025, non diplômante). Je développe ma maîtrise opérationnelle avec des labs, des diagnostics et une documentation vérifiable.",
    "service1":"Dépannage IT à distance", "service1desc":"Diagnostic de postes, logiciels et périphériques ; assistance utilisateurs.",
    "service2":"Configuration LAN / Wi-Fi", "service2desc":"Adressage IP, routeurs, configuration de petits réseaux et isolation des pannes.",
    "service3":"Documentation d'infrastructure", "service3desc":"Schémas réseau, procédures de configuration et rapports techniques adaptés au besoin.",
    "skill1":"Réseaux & routage", "skill2":"Systèmes & virtualisation", "skill3":"Sécurité & supervision", "skill4":"Support & exploitation",
    "skilltext1":"TCP/IP, OSPF, VLAN, adressage IP, VPN et analyse de paquets", "skilltext2":"Windows Server, AD/GPO, Linux, Proxmox, sauvegardes", "skilltext3":"Labs FortiGate/Palo Alto, Zabbix, Wazuh, Snort", "skilltext4":"Support à distance, incidents, diagnostic, ITSM",
    "details":"Voir l'étude de cas", "source":"Voir le code GitHub", "status_source":"Code publié · tests réels à réaliser", "status_rebuild":"Stage passé · reconstruction prévue", "status_practice":"Pratique en lab · preuves à documenter",
    "status_experience":"Expérience professionnelle · déclarée au CV", "status_internship":"Stage · déclaré au CV",
    "contact_kicker":"05 / CONTACT", "contact_title":"Un problème d'infrastructure à résoudre ?", "contact_sub":"Discutons de vos besoins en support IT à distance, configuration réseau ou collaboration technique. Contact direct ou via GitHub et LinkedIn.", "send_email":"Envoyer un e-mail", "github_label":"Profil GitHub", "linkedin_label":"Profil LinkedIn",
    "footer_note":"Site statique rapide et sans dépendances d'exécution. Les faits et validations sont annoncés avec précision.", "footer_copyright":"Tous droits réservés.",
    "back":"Retour aux projets", "case_overview":"Présentation", "case_scope":"Périmètre et statut réel", "case_evidence":"Preuves et prochaines étapes", "case_stage":"Classification", "case_link":"Dépôt GitHub", "case_outcome":"Ce que ce travail montre", "case_next":"Étapes de validation",
    "other_projects":"Autres projets techniques", "lang_switch":"Choisir la langue", "menu_open":"Ouvrir le menu", "menu_close":"Fermer le menu",
    "meta_desc":"Taha Zitane — Administration systèmes et réseaux, exploitation IT et sécurité réseau. Expériences professionnelles, laboratoires et études de cas.",
    "case_content":{
      "enterprise-network-lab": {
        "scope":"Conception et versionnement d'un laboratoire réseau multi-sites. Le profil de base utilise FRRouting/OSPF area 0 et des tests siège/agence ; le profil sécurisé ajoute VLAN, filtrage Linux et WireGuard. Code revu, mais les tests de connectivité réels n'ont pas encore été exécutés sur la machine cible.",
        "outcome":"Topologie reproductible, configurations, scripts de test, procédures et plan de validation transparent.",
        "next":["Déployer le profil de base dans une VM Linux avec Docker et Containerlab.","Valider l'adjacence OSPF Full et les routes apprises.","Collecter des preuves de ping, rupture WAN et rétablissement.","Tester VLAN, pare-feu et WireGuard du profil sécurisé."]
      },
      "windows-server-ad":{
        "scope":"Stage réalisé en avril 2022 à la Direction provinciale de l'Éducation : serveurs physiques, installation Windows Server et Active Directory, support LAN et postes. Cette page décrit l'expérience passée ; elle ne suppose pas la conservation de configurations ou captures de production de l'employeur.",
        "outcome":"Participation pratique au déploiement de services Windows et au support d'infrastructure dans une institution.",
        "next":["Recréer un lab Windows Server et Active Directory isolé et moderne.","Configurer DNS, unités d'organisation, groupes, GPO et autorisations.","Ajouter partages, sauvegardes, restaurations et cas de dépannage.","Publier des preuves nouvelles et anonymisées du lab, distinctes du stage."]
      },
      "security-observability-labs":{
        "scope":"Pratique autonome sur FortiGate et Palo Alto, Wireshark, Zabbix/SNMP, Wazuh (bases SIEM) et Snort. Inventaire de technologies pratiquées, sans prétendre les avoir exploitées en production d'entreprise.",
        "outcome":"Expérience pratique des principes de visibilité réseau, politiques de filtrage et supervision de sécurité.",
        "next":["Documenter un cas de pare-feu avec tests de politiques et packet-flow.","Déployer Zabbix et collecter des alertes réelles.","Créer une détection Wazuh avec événements produits dans un lab autorisé.","Publier chaque étude de cas après validation concrète."]
      },
      "remote-it-support": {
        "scope":"Missions indépendantes de support IT et assistance systèmes/réseaux depuis 2025 : téléassistance utilisateurs, dépannage logiciels et périphériques, configuration de routeurs LAN/Wi-Fi et adressage IP selon les besoins. Présentation de l'expérience, sans publication de systèmes clients.",
        "outcome":"Compétences de diagnostic, analyse d'incidents, communication et télémaintenance sécurisée. Aucun indicateur de délai ou nombre de tickets inventé.",
        "next":["Créer un runbook anonymisé pour les incidents DNS, DHCP et Wi-Fi.","Reproduire les problèmes courants en environnement de test isolé.","Documenter procédures, journaux fictifs clairement étiquetés et analyse des causes.","Définir des prestations freelance au périmètre et limites explicites."]
      },
      "hospital-network-support": {
        "scope":"Stage à l'Hôpital Mohammed V de Chefchaouen (novembre 2023 à janvier 2024) : assistance utilisateurs, participation à la configuration du réseau Enova Santé et remontée d'anomalies applicatives. Aucune documentation réseau réelle de l'hôpital n'est reproduite.",
        "outcome":"Expérience du support opérationnel et de l'escalade structurée dans un établissement réel, avec respect de la confidentialité.",
        "next":["Reconstituer un schéma réseau fictif sans détails réels de l'établissement.","Documenter les bonnes pratiques de support et d'escalade.","Tester un scénario de diagnostic VLAN et connectivité applicative en lab.","Publier une étude de cas lab séparée avec de vraies preuves de tests."]
      },
    }
},
"ar": {
    "code":"AR", "locale":"ar_MA", "language_name":"العربية", "dir":"rtl", "path":"/ar/",
    "nav_label":"التنقل الرئيسي", "nav_projects":"المشاريع", "nav_experience":"الخبرة", "nav_expertise":"المهارات", "nav_services":"الخدمات", "nav_contact":"التواصل",
    "availability":"متاح لمناقشة فرص العمل عن بُعد والمشاريع المستقلة", "hero_kicker":"البنية التحتية  /  التشغيل  /  الأمن",
    "hero_title_pre":"تصميم وتشغيل", "hero_title_highlight":"بنية تحتية موثوقة.",
    "hero_sub":"أعمل على إدارة الأنظمة والشبكات وتشخيص أعطالها وتوثيقها، مع تعميق الخبرة في أمن الشبكات المؤسسية والمراقبة والتطبيق العملي الموثّق.",
    "hero_role":"إدارة الأنظمة والشبكات · تشغيل البنية التحتية · أمن الشبكات",
    "view_work":"استكشف المشاريع", "contact_me":"لنتعاون", "location":"شفشاون، المغرب · العمل عن بُعد",
    "diagram_title":"عمليات الشبكة / مخطط المختبر", "diagram_sub":"المقر ↔ الفرع · التوجيه والحماية", "diagram_hq":"المقر الرئيسي", "diagram_branch":"الفرع", "diagram_security":"جدار ناري / VPN", "diagram_status":"النسخة الأولى · بانتظار الاختبارات الفعلية", "diagram_caption":"مخطط توضيحي · ليس لوحة مراقبة مباشرة",
    "proof_intro":"ماذا ستجد هنا؟", "proof_1_title":"خبرة ميدانية", "proof_1_text":"تداريب مهنية ودعم تقني وتكوين.", "proof_2_title":"مختبرات قابلة للإعادة", "proof_2_text":"إعدادات وسكريبتات اختبار وأدلة تشغيل.", "proof_3_title":"توثيق شفاف", "proof_3_text":"تمييز واضح بين المصدر والتجارب والنتائج المختبرة.",
    "section_projects_kicker":"01 / أعمال مختارة", "section_projects_title":"مشاريع بعمق تقني.", "section_projects_sub":"ليست مجرد أسماء أدوات؛ بل المشكلة والتصميم والإعدادات وحالة إثبات النتائج.",
    "section_experience_kicker":"02 / الخبرة المهنية", "section_experience_title":"من الدعم التقني إلى البنية التحتية.", "section_experience_sub":"خبرات وتداريب ميدانية متميزة عن المختبرات الشخصية.",
    "section_skills_kicker":"03 / المجالات التقنية", "section_skills_title":"تشغيل. تشخيص. حماية.", "section_skills_sub":"مجالات خبرتي العملية والمهارات التي أعمل على تعميقها بمشاريع تطبيقية.",
    "section_services_kicker":"04 / الخدمات", "section_services_title":"خدمات تقنية عملية وواضحة.", "section_services_sub":"يُحدّد نطاق كل مهمة وتوفر الخدمة بالاتفاق المسبق.",
    "section_about_kicker":"المسار التعليمي", "about_title":"أساس تقني قوي وتطوير مستمر.", "about_text":"حاصل على دبلوم تقني متخصص في تقنيات شبكات المعلوميات من ISMO تطوان (2022)، مع سنة دراسية في السلك الهندسي للمعلوميات والشبكات بـ EMSI طنجة (2024–2025، دون الحصول على دبلوم هندسة). أعمل على تعميق مهاراتي عبر المختبرات العملية وتشخيص الأعطال والتوثيق القابل للتحقق.",
    "service1":"الدعم التقني عن بُعد", "service1desc":"تشخيص أعطال الحواسيب والبرامج والطابعات ومساعدة المستخدمين.",
    "service2":"إعداد الشبكات المحلية والواي فاي", "service2desc":"عنونة IP وضبط الموجّهات والشبكات الصغيرة وتحديد أسباب الأعطال.",
    "service3":"توثيق مشاريع البنية التحتية", "service3desc":"مخططات الشبكات وأدلة الإعداد وتقارير تقنية حسب نطاق العمل المتفق عليه.",
    "skill1":"الشبكات والتوجيه", "skill2":"الأنظمة والافتراضية", "skill3":"الأمن والمراقبة", "skill4":"الدعم والتشغيل",
    "skilltext1":"TCP/IP وOSPF وVLAN وVPN وتخطيط العناوين وتحليل الحزم", "skilltext2":"Windows Server وAD/GPO وLinux وProxmox والنسخ الاحتياطي", "skilltext3":"تجارب FortiGate/Palo Alto وZabbix وWazuh وSnort", "skilltext4":"الدعم عن بُعد وتذاكر الأعطال والتشخيص وITSM",
    "details":"عرض دراسة الحالة", "source":"عرض المصدر على GitHub", "status_source":"المصدر منشور · الاختبار العملي لم يكتمل", "status_rebuild":"تدريب سابق · إعادة بناء مختبر مخطط لها", "status_practice":"تجارب مخبرية · التوثيق التفصيلي قادم",
    "status_experience":"خبرة مهنية · مذكورة في السيرة الذاتية", "status_internship":"تدريب مهني · مذكور في السيرة الذاتية",
    "contact_kicker":"05 / التواصل", "contact_title":"هل لديك مشكلة تقنية تحتاج إلى حل؟", "contact_sub":"يمكننا مناقشة احتياجات الدعم التقني عن بُعد أو إعداد الشبكات أو التعاون التقني. تواصل معي مباشرة أو عبر GitHub وLinkedIn.", "send_email":"إرسال بريد إلكتروني", "github_label":"حساب GitHub", "linkedin_label":"حساب LinkedIn",
    "footer_note":"موقع ثابت سريع ولا يحتاج إلى خدمات تشغيل مدفوعة. تُعرض الخبرات وحالات التحقق بدقة وشفافية.", "footer_copyright":"جميع الحقوق محفوظة.",
    "back":"العودة إلى المشاريع", "case_overview":"نظرة عامة", "case_scope":"النطاق وحالة التنفيذ الفعلية", "case_evidence":"الأدلة والخطوات التالية", "case_stage":"تصنيف المشروع", "case_link":"مستودع GitHub", "case_outcome":"ماذا يثبت هذا العمل؟", "case_next":"خطوات التحقق المقبلة",
    "other_projects":"مشاريع تقنية أخرى", "lang_switch":"اختر اللغة", "menu_open":"فتح قائمة التنقل", "menu_close":"إغلاق القائمة",
    "meta_desc":"طه زيتان — إدارة الأنظمة والشبكات، تشغيل البنية التحتية وأمن الشبكات. تجارب مهنية ومختبرات تطبيقية ودراسات حالة تقنية.",
    "case_content":{
      "enterprise-network-lab": {
        "scope":"تصميم وتوثيق مختبر شبكة مؤسسية بموقعين. يستخدم النموذج الأساسي FRRouting وOSPF area 0 مع اختبارات اتصال بين المقر والفرع، بينما يضيف النموذج الآمن VLAN وفلترة Linux وWireGuard. روجع المصدر، ولم تُنجز اختبارات الاتصال الحقيقية بعد على الجهاز المستهدف.",
        "outcome":"تصميم قابل لإعادة التنفيذ وإعدادات توجيه وسكريبتات اختبار وإرشادات تشغيل وخطة واضحة لتوثيق النتائج.",
        "next":["تشغيل النموذج الأساسي في Linux VM باستخدام Docker وContainerlab.","التحقق من OSPF Full والمسارات المتعلّمة.","جمع أدلة Ping وانقطاع الربط بين الموقعين واستعادته.","اختبار VLAN وقواعد الجدار الناري وWireGuard في النموذج الآمن."]
      },
      "windows-server-ad":{
        "scope":"تدريب في أبريل 2022 بالمديرية الإقليمية للتربية الوطنية شمل إعداد خوادم فعلية وتثبيت Windows Server وActive Directory ودعم الشبكة المحلية وأجهزة المستخدمين. هذا توثيق للخبرة الماضية، ولا يفترض الاحتفاظ بإعدادات أو صور من بيئة عمل المؤسسة.",
        "outcome":"مشاركة عملية في نشر خدمات Windows ودعم بيئة مؤسساتية حقيقية.",
        "next":["إعادة بناء مختبر Windows Server وActive Directory حديث ومعزول.","إعداد DNS والوحدات التنظيمية والمجموعات وGPO والصلاحيات.","إضافة مشاركة الملفات والنسخ الاحتياطي والاستعادة وسيناريوهات التشخيص.","نشر أدلة جديدة من المختبر دون خلطها بوثائق مكان التدريب."]
      },
      "security-observability-labs":{
        "scope":"تجارب تعلم شخصية على FortiGate وPalo Alto وتحليل الحزم باستخدام Wireshark والمراقبة بـ Zabbix/SNMP وأساسيات Wazuh SIEM وSnort. لا يعني ذلك تشغيل حلول أمنية إنتاجية لدى مؤسسة.",
        "outcome":"خبرة تطبيقية أولية في رؤية حركة الشبكة وسياسات الحماية والمراقبة الأمنية.",
        "next":["توثيق تجربة Firewall مع اختبارات السياسات ومسار الحزم.","تشغيل مراقبة Zabbix مع حالات تنبيه حقيقية.","إنشاء حالة اكتشاف Wazuh بأحداث مولّدة داخل مختبر مصرح به.","نشر دراسات حالة منفصلة بعد التحقق العملي."]
      },
      "remote-it-support": {
        "scope":"مهام مستقلة في الدعم التقني وإدارة الأنظمة والشبكات منذ 2025، تشمل المساعدة عن بُعد وإصلاح مشاكل البرامج والطابعات وأجهزة المستخدمين وإعداد الموجّهات والشبكات المحلية والواي فاي وعنونة IP. توثيق الخبرة لا يعني نشر أنظمة العملاء.",
        "outcome":"تُظهر القدرة على تشخيص المشاكل والتواصل مع المستخدمين وحل الأعطال بصورة منظمة مع الحفاظ على السرية. لا تُعرض أرقام أو تقييمات عملاء غير موثقة.",
        "next":["إنشاء دليل تشخيص منقّح لمشاكل DNS وDHCP والواي فاي.","إعادة إنتاج الأعطال داخل مختبر معزول بدل مشاركة بيانات العملاء.","توثيق خطوات الاختبار وتحليل الأسباب الجذرية.","عرض خدمات العمل الحر مع تحديد نطاق كل خدمة وحدودها."]
      },
      "hospital-network-support": {
        "scope":"تدريب مهني بمستشفى محمد الخامس في شفشاون (نونبر 2023 – يناير 2024): مساعدة المستخدمين، والمشاركة في إعداد شبكة Enova Santé، ورفع ملاحظات عن أعطال التطبيقات. لا يحتوي الموقع على تفاصيل حساسة حول شبكة المستشفى.",
        "outcome":"خبرة في الدعم التشغيلي وتصعيد المشاكل التقنية ضمن مؤسسة حقيقية، مع احترام سرية المعلومات.",
        "next":["تصميم مخطط توضيحي خيالي لشبكة مؤسسة صحية، دون معلومات حقيقية.","توثيق أساليب المساعدة وتصعيد الأعطال.","التدرّب على مشاكل VLAN وربط التطبيقات داخل مختبر معزول.","نشر دراسة حالة منفصلة بعد إجراء اختبارات حقيقية وتوثيقها."]
      },
    }
}
}
