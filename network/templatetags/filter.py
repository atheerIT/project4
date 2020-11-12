from django import template

register = template.Library()


@register.filter()
def range1(min, max):
    return range(min, max+1)
