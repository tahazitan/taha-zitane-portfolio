# Taha Zitane — Practical Infrastructure Engineering Roadmap

This is the execution plan that connects the [portfolio](../README.md), its [3D architectures](../src/data/labTopologies.ts), and the lab repositories we will build. The 3D diagrams model reference architectures. A tested implementation is published only after it produces real, sanitized evidence.

## Four-stage engineering process

| Gate | Deliverable | Acceptance criterion |
|---|---|---|
| 01 — Architecture | Context, logical/physical topology, addressing, interface map, traffic policy | Every node and link has an explanation and a planned address/VLAN |
| 02 — Deployment | Scripts, installation steps, configuration snapshots, version manifest | A second person can reproduce the lab from an isolated clean environment |
| 03 — Verification | Real command output, packet capture, negative tests, rollback/recovery | Each expected flow is tested and results are captured, not inferred |
| 04 — Publication | Diagram, outcomes, troubleshooting, redacted screenshots, learning notes | GitHub README and portfolio case study refer to verifiable evidence |

## Eight portfolio case studies

| Order | Project | Practical milestone | Test evidence to collect |
|---|---|---|---|
| 1 | Enterprise multi-site network — OSPF / VLAN / WireGuard | HQ + Branch, routing, one security tunnel and failure recovery | OSPF neighbor state, route table, segmented ping matrix, tunnel handshakes, failure & recovery logs |
| 2 | Windows Server / Active Directory | Isolated domain controller, DNS, OU / GPO, managed clients, file shares | DNS resolution, domain join, group policy result, share permissions, backup restore |
| 3 | Proxmox virtual infrastructure | Hypervisor, Linux bridge/VLAN aware network, Windows/Linux guests, backups | Hypervisor networking config, guest connectivity, restore of a test VM |
| 4 | FortiGate ↔ Palo Alto IPsec | Two firewalls, IKE/IPsec, routing, NAT exemption, least-privilege rules | Sanitized tunnel status, allow/deny matrix, policy rule numbers, rollback |
| 5 | Cisco campus VLAN | Access/distribution, 802.1Q, STP, inter-VLAN gateway, ACL | VLAN/trunk/STP outputs and permitted/denied flow matrix |
| 6 | Security monitoring — Wazuh / Snort / Wireshark | Event pipeline, IDS sensor, triage dashboard, test traffic generator | Original events with timestamps, IDS alert screenshots, benign/negative tests |
| 7 | Remote IT support workflow | Synthetic incident scenarios modeled on professional troubleshooting | Anonymized ticket template, diagnosis tree, action/verification checklist |
| 8 | Healthcare network support case study | Architecture and support methodology derived from public-safe knowledge | Public-safe communication/escalation runbook only; no patient or employer data |

## Preferred order and project relationships

1. **Multi-site lab** gives routing, addressing and Linux networking primitives used elsewhere.
2. **Proxmox lab** provides a reproducible virtualization foundation for the Windows Server / AD and monitoring environments.
3. **Windows Server / AD** provides DNS, identity and endpoint administration.
4. **Cisco campus lab** establishes L2 segmentation and L3 policy boundaries.
5. **Multi-vendor IPsec** tests isolation, routing, trust boundaries and operational rollback.
6. **Observability lab** connects safe network events to alerting and incident investigation.
7. **Remote support** and **healthcare experience** remain professional case studies, not fake client labs. Publish permitted lessons and synthetic reproductions, clearly distinguished from actual workplace details.

## Safe implementation rules

- Only simulate services and addresses in isolated networks you own or are authorized to administer.
- Do not reproduce proprietary employer configurations, patient records, coworker data or customer diagnostics in public repositories.
- Never commit credentials, private keys, WireGuard secrets, tokens, public attack targets or customer IPs.
- Give every diagram and command an appropriate label: reference architecture, sample configuration, or actually verified result.
- Avoid screenshots of labs that have not run; when there is no test evidence, publish the design and specification as such.
- Course attendance is not equivalent to vendor examination certification.

## Suggested lab repository layout

```text
project-name/
├── README.md                     # goals, topology, status, instructions
├── diagrams/                     # exported diagram and its editable source
├── config/                       # sanitized configuration templates
├── scripts/                      # build, test, rollback (where appropriate)
├── tests/                        # acceptance tests and expected outcomes
├── evidence/                     # original redacted outputs, dated
└── docs/                         # decisions and troubleshooting notes
```

Keep the website lightweight; the portfolio should summarize the project and link to the independently reproducible GitHub implementation. Update the portfolio case studies after a lab passes the acceptance criteria.
