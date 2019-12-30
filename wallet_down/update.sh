#!/usr/bin/env bash
# parity update

# get /root/seekchain/seek-chain-parity md5sum value

localparity=`md5sum /root/seekchain/seek-chain-parity |  awk '{print $1}'`
if test $? -ne 0; then
    echo 'get md5 failed'
    exit 1
fi

echo $localparity
rm -rf /root/seek-chain-parity
rm -rf /root/seek-chain-scavenger
rm -rf /root/seek.zip

echo "downloading the latest codes "

wget http://yotta.oss-cn-hangzhou.aliyuncs.com/seek.zip
if test $? -ne 0; then
    echo 'get remote seekchain failed'
    exit 1
fi

unzip seek.zip
if test $? -ne 0; then
    echo 'get remote seekchain failed'
    exit 1
fi

chmod a+x seek-chain-scavenger seek-chain-parity
remoteparity=`md5sum /root/seek-chain-parity |  awk '{print $1}'`
if test $? -ne 0; then
    echo 'get remote parity md5 value failed'
    exit 1
fi

echo $remoteparity

if [ $remoteparity == $localparity ]
then
	echo "the parity version is the latest code now,"
else
	echo "we will start the code"
	echo "remove a monitor job from crontab"
	crontab -u root -l |grep -v '/root/daemon.sh' | crontab -u root -
	echo "waiting for the crontab finished his task"
	echo "stop the parity"
 	screen -wipe 
	screen -ls | grep parity | cut -d. -f1 | xargs kill -9

 	screen -wipe 
	cp -rf /root/seek-chain-parity    /root/seekchain
	if test $? -ne 0; then
		echo "add the monitor crontab"
		( crontab -l | { cat; echo "*/1 * * * * /bin/bash  /root/daemon.sh "; } ) | crontab -
    		exit 1
	fi
	echo "add the monitor crontab"
	( crontab -l | { cat; echo "*/1 * * * * /bin/bash  /root/daemon.sh "; } ) | crontab -

fi

echo "start update the localscavenger"
localscavenger=`md5sum /root/seekchain/seek-chain-scavenger |  awk '{print $1}'`
if test $? -ne 0; then
    echo 'get md5 failed'
    exit 1
fi

echo $localscavenger


remotescavenger=`md5sum /root/seek-chain-scavenger |  awk '{print $1}'`
if test $? -ne 0; then
    echo 'get remote scavenger md5 value failed'
    exit 1
fi

echo $remotescavenger

if [ $remotescavenger == $localscavenger ]
then
	echo "the version is the latest code now,"
else
	echo "we will start the code"
	echo "remove a monitor job from crontab"
	crontab -u root -l |grep -v '/root/daemon.sh' | crontab -u root -
	echo "waiting for the crontab finished his task"
	echo "stop the scavenger"
 	screen -wipe 
	screen -ls | grep miner | cut -d. -f1 | xargs kill -9 
#	if test $? -ne 0; then
#    		echo 'scavenger failed'
#		echo "add the monitor crontab"
#		( crontab -l | { cat; echo "*/1 * * * * /bash  /root/daemon.sh "; } ) | crontab -
#    		exit 1
#	fi
	screen -wipe
	cp -rf  /root/seek-chain-scavenger    /root/seekchain
	if test $? -ne 0; then
    		echo 'copy failed'
		echo "add the monitor crontab"
		( crontab -l | { cat; echo "*/1 * * * * /bin/bash  /root/daemon.sh "; } ) | crontab -
    		exit 1
	fi

		echo "add the monitor crontab"
		( crontab -l | { cat; echo "*/1 * * * * /bin/bash  /root/daemon.sh "; } ) | crontab -
fi

crontab -l
/bin/bash /root/daemon.sh
