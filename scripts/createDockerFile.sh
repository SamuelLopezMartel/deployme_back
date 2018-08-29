echo "FROM ubuntu
WORKDIR /tmp
RUN apt-get update && apt-get install git -y
RUN apt-get install nginx -y
RUN git clone $1
RUN ls /tmp/$2/
RUN mv /tmp/$2/* /var/www/html/

EXPOSE 80
CMD [\"nginx\",\"-g\",\"daemon off;\"]" > /home/deployme/client-setup-files/Dockerfile