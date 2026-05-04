from rest_framework.pagination import PageNumberPagination


class OptionalPageNumberPagination(PageNumberPagination):
    """
    Keep property payloads bounded on low-memory hosts such as Render free.
    """

    page_size = 24
    page_size_query_param = "page_size"
    max_page_size = 100
