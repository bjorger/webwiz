from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
import os
import pandas as pd

@api_view(['POST'])
def data(request):
    dirname = os.path.dirname(__file__)
    filename = os.path.join(dirname, 'data.csv')
    data_frame = pd.read_csv(filename)
    data_frame['education'] = pd.factorize(data_frame['education'])[0]
    data_frame['age'] = pd.factorize(data_frame['age'])[0]
    data_frame['gender'] = pd.factorize(data_frame['gender'])[0]
    data_frame['income'] = pd.factorize(data_frame['income'])[0]
    # categorize stuff
    data_frame['education'] = pd.factorize(data_frame['education'])[0]
    data_frame['age'] = pd.factorize(data_frame['age'])[0]
    data_frame['gender'] = pd.factorize(data_frame['gender'])[0]
    data_frame['income'] = pd.factorize(data_frame['income'])[0]

    return Response(data_frame)
