from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from .models import ToDoList, Item
from .forms import CreateNewList

# Create your views here.
def index(response, id):

    try:
        todo_list = ToDoList.objects.get(id=id)
        if todo_list in response.user.todolist.all():
            if response.method == "POST":
                print(response.POST)
                if response.POST.get("save"):
                    for item in todo_list.item_set.all():
                        if response.POST.get("c" + str(item.id)) == "clicked":
                            item.complete = True
                        else:
                            item.complete = False

                        item.save()
                elif response.POST.get("newItem"):
                    txt = response.POST.get("new")

                    if len(txt) > 2:
                        todo_list.item_set.create(text=txt, complete=False)
                    else:
            return render(response, "main/list.html", {"item_list": todo_list})
    except ToDoList.DoesNotExist:
        print("errpr")
        return render(response, "main/view.html", {})

def home(response):
    return render(response, "main/home.html", {"name": "test"})


def create(response):
    if response.method == "POST":
        form = CreateNewList(response.POST)

        if form.is_valid():
            n = form.cleaned_data["name"]
            t = ToDoList(name=n)
            t.save()
            response.user.todolist.add(t)

        return HttpResponseRedirect("/view")
    else:
        form = CreateNewList()
    return render(response, "main/create.html", {"form": form})

def view(response):
    return render(response, "main/view.html")