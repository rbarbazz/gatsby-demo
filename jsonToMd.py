import json
import os
import re

def slugify(text):
    text = text.lower()
    return re.sub(r"[\W_]+", "-", text)

with open("MOCK_DATA.json") as json_file:
	data = json.load(json_file)
	for row in data:
		slug = slugify(row["name"])
		try:
			os.mkdir("content/products/" + slug)
		except OSError:
			print ("Creation of the directory %s failed" % slug)
		else:
			print ("Successfully created the directory %s " % slug)

		f = open("content/products/"+slug + "/index.md", "w")
		f.write("""---
title: {name}
price: {price}
description: {description}
image: {image}
---""".format(name=row["name"], description=row["description"],price=row["price"],image=row["image"]))
		f.close()