export default {
  columns: [
    { name: "id", _name: "id", type: "hidden" },
    { name: "date", _name: "released_date", type: "hidden" },
    { name: "time", _name: "released_time", type: "input:time", backup: true },
    { name: "country", _name: "country", type: "input:text", remark: "area", backup: true },
    { name: "event", _name: "event", type: "textarea", backup: true },
    { name: "importance", _name: "importance", type: "select", center: true, backup: true },
    { name: "previous", _name: "previous", type: "textarea", remark: "modified", center: true, backup: true },
    { name: "forecast", _name: "forecast", type: "textarea", center: true, backup: true },
    { name: "actual", _name: "actual", type: "textarea", center: true, backup: true },
    { name: "validdate", _name: "valid_date", type: "input:date", backup: true },
    { name: "state", _name: "state", type: "" },
    { name: "locale", _name: "locale", type: "hidden" }
  ]
};
