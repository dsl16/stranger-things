class Puppy(object):
    def __init__(self,name,weight,breed,friendly):
        assert type(name) == str
        assert type(weight) == int
        assert type(breed) == str
        assert type(friendly) == bool
        self.name = name
        self.weight = weight
        self.breed = breed
        self.friendly = friendly

    def approach(self):
        if self.friendly:
            print(f'{self.name} approaches you with a wagging tail!')
        else:
            print(f'{self.name} bites you!!')

    def eat(self,amount):
        assert type(amount) == int
        self.weight += amount

    def poop(self,amount):
        assert type(amount) == int
        self.weight -= amount
