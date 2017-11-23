try:
    from setuptools import setup
except ImportError:
    from distutils.core import setup

config = {
'description': 'Fun Module',
'author': 'Darrin Lim',
'url': 'URL to get it at.',
'download_url': 'Where to download it.',
'author_email': 'darrin.s.lim@gmail.com',
'version': '0.1',
'install_requires': ['nose'],
'packages': ['funmodule'],
'scripts': ['bin/bob_the_dog.py'],
'name': 'Fun Module'
}

setup(**config)
