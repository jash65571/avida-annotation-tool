# Project: Multi-Interface Network Device Discovery Tool

## Goal

Build a Python command-line tool that discovers devices on a local network using multiple discovery methods, with proper support for selecting and binding to different network interfaces.

The tool should correctly handle the common challenges of sending and receiving packets on the chosen interface(s).

## Core Requirements

### 1. Network Interface Handling

- Automatically detect and list all available network interfaces, excluding loopback.
- Allow the user to select one or more interfaces via command-line argument, config, or interactive prompt.
- Display basic interface information:
  - Name
  - IPv4 address
  - Netmask
  - MAC address, if available
- Ensure all discovery operations, including scans and multicast queries, are correctly bound to the selected interface(s) so traffic goes out and returns on the right NIC.

### 2. Discovery Methods

Implement at least these three methods.

#### Host Discovery

- Use ARP scanning, preferred, or ICMP ping sweep on the selected interface/subnet to find live hosts.
- Collect IP addresses and, where possible, MAC addresses.

#### Port Scanning

- For discovered live hosts, perform an asynchronous port scan on a reasonable set of common ports relevant to IoT/security devices.
- Suggested minimum ports:
  - 80
  - 443
  - 554
  - 8000
  - 8080
  - 8554
  - 5353
- Report which ports are open.
- Basic banner grabbing is a plus but not required.

#### mDNS / ZeroConf Discovery

- Perform multicast DNS discovery on the selected interface(s).
- Capture service instances including:
  - Service type
  - Instance name
  - Resolved IP
  - Port
  - TXT records

### 3. Concurrent Execution

- Perform discovery operations concurrently so the tool remains responsive and finishes faster when scanning multiple hosts, ports, or interfaces.
- Concurrent operations include:
  - Host scanning
  - Port scanning
  - mDNS queries
- Use any suitable concurrency model you consider appropriate, for example:
  - `asyncio`
  - `trio`
  - `threading`
  - `concurrent.futures`
  - `multiprocessing`
  - other approaches
- Display results in real time as devices and services are discovered.
- Real-time output may include:
  - Progress messages
  - Updating table
  - Similar console output

### 4. Output

- Produce clear, structured console output.
- Output can be:
  - Plain text
  - Formatted table
  - JSON lines
- Group results by interface when multiple interfaces are selected.
- For each discovered device, show at minimum:
  - IP address
  - MAC address, if available
  - Hostname, if resolved
  - Open ports
  - mDNS services, including type, name, port, and TXT records if present

## Nice-to-Haves

Optional, only if time remains.

- SSDP / UPnP discovery on selected interfaces
- Basic MQTT listener, subscribe to a wildcard topic and log any device announcements
- Save results to a JSON or CSV file
- Simple live progress bar or updating display, for example using `rich`, `textual`, or plain prints
- Filter options, for example only scan certain ports or look for specific service types

## Technical Guidelines

- Use Python 3.9 or newer.
- You may use well-maintained, pip-installable libraries, such as:
  - `scapy`, strong choice for ARP and packet-level work
  - `python-zeroconf` / `zeroconf`, for mDNS
  - `netifaces`, `ifaddr`, or `psutil`, for interface enumeration
  - `python-nmap` or manual socket scanning, for ports
- No web UI or GUI is required. A clean, functional console application is preferred.

## Important Safety Notes

- Include clear warnings in the README and in the tool itself about permissions.
- Some operations may require root/admin privileges.
- Avoid aggressive scanning patterns that could be mistaken for malicious activity.

## AI Use

AI use is okay. Please include how it was used in your presentation.
