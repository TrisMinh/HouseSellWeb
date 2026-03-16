from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .services import PredictionService

class PricePredictionView(APIView):
    """
    API View to handle house price prediction.
    Delegates machine learning operations to PredictionService.
    """
    def post(self, request):
        try:
            # Delegate model execution to service layer
            result = PredictionService.predict_price(request.data)
            return Response(result, status=status.HTTP_200_OK)
            
        except ValueError as e:
            # Custom validation errors
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Unexpected errors (like model file missing)
            return Response({"error": "Internal server error: " + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
