FROM python
COPY . /back-end
WORKDIR /back-end
RUN pip install -r requierements.txt
CMD python ./api.py