# LSHW

## Requirements

- Node v10.22.1 or higher

- A CPU

## Caveats And Observations

 - For the storage devices I could not figure out how to use a singular system API call get all of the required info, so the `AvailableGB` field is fixed at 0
 - Cross-platform was my approach to this as it wasn't clear in the READMEs
 - I took a naive approach to finding and updating the `Network` fields: I'm iterating over two inputs to match the network interfaces
 - I tried looking up (to no avail) the scope id for ipv6 to see if they have a standard for the corresponding scope name