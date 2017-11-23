from nose.tools import *
import funmodule

def setup():
    print("SETUP!")

def teardown():
    print("TEAR DOWN!")

def test_basic():
    print("I RAN!", end='')

def testHowdy():
    assert True
