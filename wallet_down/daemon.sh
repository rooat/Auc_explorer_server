#!/bin/bash

paritypid=`ps aux | grep "SCREEN -dmS parity" | grep -v grep | awk '{print $2}'`

if [ -z "$paritypid" ] ; then

/bin/bash /root/parity.sh

else
    echo  "parity $paritypid run normaly"
fi



minerpid=`ps aux | grep "SCREEN -dmS miner" | grep -v grep | awk '{print $2}'`
if [ -z "$minerpid" ] ; then
/bin/bash /root/miner.sh

else
    echo  "miner $minerpid run normaly"
fi

