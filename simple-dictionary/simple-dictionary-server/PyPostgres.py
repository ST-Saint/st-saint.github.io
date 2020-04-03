import logging

import psycopg2


class PyPostgres():
    def __init__(self):
        self.conn = None
        self.cursor = None

    def connect(self, host, port, database, user, password):
        self.conn = psycopg2.connect(host=host,
                                     port=port,
                                     database=database,
                                     user=user,
                                     password=password)
        self.cursor = self.conn.cursor()

    def query(self, sqlcommand, args=None):
        try:
            self.cursor = self.conn.cursor()
            self.cursor.execute(sqlcommand, args)
            result = self.cursor.fetchall()
        except Exception as e:
            logging.error("postgres query error: %s\n mysql:%s args: %s" %
                          (e, sqlcommand, args))
            return False
        return result

    def execute(self, sqlcommand, args=None):
        try:
            self.cursor = self.conn.cursor()
            if isinstance(args, (list, tuple)) and len(args) > 0 and \
                    isinstance(args[0], (list, tuple)):
                line = self.cursor.executemany(sqlcommand, args)
            else:
                line = self.cursor.execute(sqlcommand, args)
        except Exception as e:
            # traceback.print_exc()
            logging.error("postgres execute error: %s" % e)
            return False
        return line, self.cursor

    def commit(self):
        self.conn.commit()

    def rollback(self):
        self.conn.rollback()

    def close(self):
        if self.cursor:
            self.cursor.close()
        if self.conn:
            self.conn.close()
        logging.info('close postgres success')
