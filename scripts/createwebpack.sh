echo "
FROM node
WORKDIR /tmp
RUN apt-get update && apt-get install git -y
RUN git clone $1
WORKDIR /tmp/$2
RUN pwd
RUN npm install
RUN npm run-script build
RUN apt install nginx -y
RUN mv /tmp/dist/* /usr/share/nginx/html/
EXPOSE 80
CMD [\"nginx\",\"-g\",\"daemon off;\"]" > /home/deployme/client-setup-files/Dockerfile
