
( crontab -l | { cat; echo "*/1 * * * * /bin/bash  /root/daemon.sh "; } ) | crontab - &&  ( crontab -l | { cat; echo "0 0 * * * /usr/sbin/ntpdate ntp.ubuntu.com"; } ) | crontab -
