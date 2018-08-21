#!bin/bash
rootPath="/home/deployme/"
uncompress="tar -xzf /tmp/setup-files.tar.gz"
deleteCompressed=" && rm /tmp/setup-files.tar.gz"
updateApt=" && sudo apt update -y"
installDocker="&& sudo apt-get install docker.io -y"
buildDocker="&& sudo docker build -t image-front ./client-setup-files/"
runDocker="&& sudo docker run --rm -it -p 80:80 image-front"

tar -czf setup-files.tar.gz client-setup-files
echo "scp -i /home/private/deploymepairkeys.pem setup-files.tar.gz ubuntu@$1:/tmp"
scp -i /home/private/deploymepairkeys.pem setup-files.tar.gz ubuntu@$1:/tmp
rm setup-files.tar.gz
ssh -i /home/private/deploymepairkeys.pem -t -o "StrictHostKeyChecking no" ubuntu@$1 $uncompress$deleteCompressed$updateApt$installDocker$buildDocker$runDocker'; bash -l' 