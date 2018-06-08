# build the frontend
FROM node:9.11.1 as frontend
COPY ui-react/. ui-react/.
RUN cd ui-react/ && npm install && npm run build --production

#build the backend
FROM node:9.11.1
WORKDIR /usr/src/app
COPY /package.json .
RUN npm install --only=production
COPY . .
COPY --from=frontend ui-react/build/. ui-react/build/.

EXPOSE 3001
CMD [ "npm", "start" ]