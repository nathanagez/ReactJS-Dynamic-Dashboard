FROM node:12 as build
WORKDIR /app
COPY ./front-end ./
RUN yarn
RUN yarn build

FROM python
COPY ./back-end /back-end
COPY --from=build /app/build /back-end/www
WORKDIR /back-end
RUN pip install -r requierements.txt
CMD python ./api.py