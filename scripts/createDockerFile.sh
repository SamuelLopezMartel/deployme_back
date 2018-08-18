echo "FROM nginx

WORKDIR /tmp
RUN apt-get update && apt-get install git -y
RUN git clone $1
RUN mv /tmp/$2/* /usr/share/nginx/html/

EXPOSE 80
CMD [\"nginx\",\"-g\",\"daemon off;\"]" > /home/deployme/client-setup-files/Dockerfile