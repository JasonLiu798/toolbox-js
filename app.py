#!/usr/bin/python
# -*- coding: utf-8 -*-
import os
import socket
import sys

reload(sys)
sys.setdefaultencoding('utf8')

import tornado.ioloop
import tornado.web
import signal
import logging

is_closing = False


def signal_handler(signum, frame):
    """
    process keyboard signal
    :param signum:
    :param frame:
    :return:
    """
    global is_closing
    logging.info('exiting...')
    is_closing = True


def try_exit():
    """
    for exist
    :return:
    """
    global is_closing
    if is_closing:
        tornado.ioloop.IOLoop.instance().stop()
        logging.info('exit success')


class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.post()

    def post(self):
        self.redirect('/static/index.html')


if __name__ == "__main__":
    # tornado.options.parse_command_line()
    signal.signal(signal.SIGINT, signal_handler)
    # socket.gethostbyname_ex(socket.gethostname()  )
    ip = socket.gethostbyname(socket.gethostname())
    port = 1080
    print 'listen on http://{ip}:{port}'.format(ip=ip,port=port)

    settings = {
        'debug': True,
        "static_path": os.path.join(os.path.dirname(__file__), "static"),
        "cookie_secret": "61oETzKXQAGaYdkL5gEmGeJJFuYh7EQnp2XdTP1o/Vo=",
        # "login_url": "/login",
        # "xsrf_cookies": True,
    }

    # app = pyrestful.rest.RestService([BookResource])
    # application = pyrestful.rest.RestService([AdminResource])
    application = tornado.web.Application([
        (r"/", IndexHandler),
    ], **settings)
    application.listen(port)
    tornado.ioloop.PeriodicCallback(try_exit, 100).start()
    tornado.ioloop.IOLoop.instance().start()
