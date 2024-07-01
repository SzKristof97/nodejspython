from do_two import something as anotherthing
from do_three import something as thirdthing

def something():
    print('do_one')
    anotherthing()
    thirdthing()


