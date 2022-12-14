---
layout: blog
title: Django Secret Key Tutorial
draft: false
date: 2022-11-15T07:50:08.017Z
lastmod: 2022-11-15T07:50:08.087Z
keywords:
  - Django
  - python
  - .env
tags:
  - tutorial
  - Django
  - Python
  - .env
categories:
  - tutorial
comment: true
toc: true
---
M﻿anaging the Django SECRET_KEY variable.

<!--more-->

T﻿he Django `SECRET_KEY` variable is very crucial to your Django application. The secret key must be a large random value and it must be kept secret. Leaking this value to unauthorized people could lead to a security breach. The SECRET_KEY is used in Django for cryptographic signing. It is used to generate tokens and hashes, they can be recreated using this variable. If it is not configured Django throws a `django.core.exceptions.ImproperlyConfigured: The SECRET_KEY setting must not be empty` error

# U﻿sing Environment Variables

T﻿he secret key should not be committed to version control. It is best practice to store the value in a .env file which is added to the  .gitignore file to un-track its changes. The values can be loaded programmatically into your settings.py file. 



# G﻿enerating A New Secret Key

This solution is using python's secrets lib on the back

```python
from django.core.management.utils import get_random_secret_key
# print new random secret key
print(get_random_secret_key())
```

This code can be run in the terminal as a command:

```python
python -c 'from django.core.management.utils import get_random_secret_key; \
            print(get_random_secret_key())'
```

Alternatively, If you are using python 3.6+ then you can use the `secrets.token_hex(\[nbytes=None])` function:

```python
python3 -c 'import secrets; print(secrets.token_hex(100))'
```

