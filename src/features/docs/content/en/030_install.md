# Installation

# Installation Examples

1. Default install
   helm repo add rustcost https://rustcost.github.io/rustcost-helmchart/
   helm repo update
   helm upgrade --install rustcost rustcost/rustcost -n rustcost --create-namespace --version 1.0.0-dev.14
