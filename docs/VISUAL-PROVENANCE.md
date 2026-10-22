# Visual provenance and truthful scope

## Institution identities
The academic timeline uses readable **institution names** for EMSI Tanger, ISMO Tétouan / OFPPT, and Lycée Al-Khawarizmi. These are *typographic nameplates*, **not invented crest, seal, or official logo artwork**. A school logo can replace a nameplate only after its authenticity and usage rights are verified. The EMSI entry is studies attended, never a completed engineering diploma.

## Technology marks
The site displays self-hosted vendor marks only for the locally present assets listed in [TECH-LOGOS.md](TECH-LOGOS.md). Unverified brand graphics (FRRouting, GNS3, Containerlab, Zabbix, WireGuard, Cybrary, Enova Santé) deliberately render as **text-only names**, not fake logos. A vendor mark identifies a referenced tool, not a credential, vendor partnership or production deployment. Courses are listed as attended trainings / attestations, not vendor certifications.

## Source-backed two-site diagrams
The two interactive diagrams in `src/components/SourceTopology.tsx` explicitly reference:
- [Base Containerlab YAML](https://github.com/tahazitan/enterprise-network-lab/blob/main/topology.clab.yml): **5 nodes, 4 links**, FRRouting HQ and branch, clients at HQ IT `10.10.10.10/24`, HQ Users `10.10.20.10/24`, branch `10.20.30.10/24`. OSPF WAN underlay `10.255.0.0/30` from router configuration.
- [Secure Containerlab YAML](https://github.com/tahazitan/enterprise-network-lab/blob/main/secure/topology.secure.clab.yml): **7 nodes, 6 links**, Linux bridge switches, VLAN 10/20/30, FRRouting, WAN `172.16.255.0/30`, designed WireGuard overlay `10.254.0.0/30` from secure README. Router interface and host addressing is documented by the respective configuration files in that repository.

Every displayed interface pair follows the YAML endpoints. Equipment-role icons identify routers, Linux bridge switches and Linux clients; they do not purport to be actual physical devices. This portfolio presents sourced **configuration/design**, *not a GNS3 screenshot or evidence that packet-level testing, secured tunnels, a running environment, or production operations succeeded*. The separately documented HQ + two branches enterprise case is a **reference architecture**, not the same thing as the two-site Containerlab source profile.

## Accessibility
FR/EN/AR section content is preserved. Text alternatives, keyboard-selectable edge inventory, scrollable mobile topology and contrast/focus affordances support recruiters on smaller screens. The node diagram is supplemented with an accessible interface inventory for clarity.
