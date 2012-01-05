module['exports'] = {
  "*::getEvents": function(cb) {
    cb(null, this.getEvents());
  },
  "*::query": function (hook, cb) {
    this.query(hook, cb);
  }
};
