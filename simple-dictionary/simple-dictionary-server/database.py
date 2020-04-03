import json

from tqdm import tqdm

import PyPostgres


def import_cet4(psql):
    cet4 = json.load(open("dataset/cet4.json"))
    for w in tqdm(cet4):
        psql.execute("insert into cet4 (word) values (%s);", (w,))
    psql.commit()


if __name__ == "__main__":
    psql = PyPostgres.PyPostgres()
    psql.connect("47.95.112.59", "5432", "dictionary", "dictionary", "simple_dictionary")
    import_cet4(psql)
