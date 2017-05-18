FROM nginx:alpine

COPY ./build  /usr/share/nginx/html
#RUN rm -Rf /usr/share/nginx/html/index.html
