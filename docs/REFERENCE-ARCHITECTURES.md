# 3D Reference Architecture Notes

The 3D studio is an interactive visualization of six planned/partly documented engineering lab **topologies**. It does not run real routing or simulate actual packets. The animated particles are visualization of the intended connectivity only. Device inspection and fallback SVG use the same structured data as the 3D scene.

## Topology designs

### A. HQ / branch dynamic routing

- Components: HQ router, branch router, WAN cloud, local switches, service node and clients.
- Goals: learn OSPF neighbor adjacency, multiple IPv4 subnets, VLAN/trunk policies and an encrypted inter-site profile.
- Example isolated address plan: HQ user `10.40.10.0/24`, HQ service `10.40.20.0/24`, branch user `10.40.30.0/24`, simulated transit `10.40.254.0/30`. Actual config must match the chosen emulator.
- Representative tests: `show ip ospf neighbor`, `show ip route ospf` (FRRouting equivalent when applicable), peer-to-peer ping, expected-deny tests and link loss/recovery.

### B. Windows Server domain services

- Components: gateway, switch, domain controller/DNS, file server, workstation, backup store.
- Example segment: `10.50.10.0/24`, internal lab domain `corp.example.test` (documentation-only example).
- Tests: DNS SRV lookup, domain join, GPO applied to test OU, file share access and denied access, restore of a throwaway test file.

### C. FortiGate / Palo Alto IPsec

- Components: two firewalls, a simulated public WAN segment, two LAN segments and endpoints.
- Example inside subnets: `10.60.10.0/24` ↔ `10.60.20.0/24`. WAN can be emulated with a contained RFC1918 transit or provider emulator.
- Tests: IKE negotiation, IPsec SA counters, routes, NAT exemption, allowed/blocked traffic, tunnel restart and log correlation.
- Vendor virtual appliances may require appropriate licenses; do not commit vendor firmware or keys.

### D. Proxmox virtualization

- Components: Proxmox VE node, VM bridge, Windows and Linux guest VMs, monitoring guest, backup target.
- Tests: isolated bridge connectivity, backup and restore of disposable VM, snapshot rollback, virtual NIC / VLAN isolation and metrics.
- Avoid exposing web admin interface to the public internet.

### E. Security visibility

- Components: edge, switch, monitored endpoints, Snort IDS sensor and Wazuh manager.
- Tests: known benign test pattern, controlled detection fixture, event ingest, timestamp correlation and alert triage record.
- Lab indicators should not be used to claim real-world detection effectiveness.

### F. Campus switching

- Components: L3 gateway, core switch, two access switches, clients from three VLANs.
- Example: VLAN 10 (`10.70.10.0/24`), VLAN 20 (`10.70.20.0/24`), VLAN 30 (`10.70.30.0/24`).
- Tests: VLAN membership, 802.1Q trunk allow list, STP state, router-on-a-stick or SVI gateway, permitted/blocked ACL reachability.

## Consistency contract

The website data in `src/data/labTopologies.ts` is the authoritative topology graph for the **presentation**. Any realistic production lab will have additional NICs, management networks, addressing, interface names and security boundaries. Those details belong in each GitHub lab repository and must be reconciled against the visual diagram when tested.
