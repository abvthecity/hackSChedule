import ajax from 'reqwest';
import Promise from 'bluebird';
import _ from 'lodash';

let methods = {};

class ApiInterface {

  constructor() {
    // do nothing
    // reserved for security verification
  }

  // quick verifier if course exists
  verify(courseId, term=null) {
    courseId = courseId.split('-');
    let dept = courseId[0];
    let num  = courseId[1].slice(0, 3);
    let seq  = courseId[1].slice(3);

    return new Promise((resolve, reject) => {
      ajax({
        url: '/api/verify/'+dept+'-'+num+seq,
        method: 'get',
        data: { dept, num, seq, term },
        success: data => resolve(data.exists),
        error: reject
      });
    });
  }

  generateCourseDataAndSchedules(courses = [], anchors = {}) {
    return new Promise((resolve, reject) => {
      ajax({
        url: '/api/schedule',
        method: 'get',
        data: { courses, anchors },
        success: resolve,
        error: reject
      });
    });
  }

}

export default ApiInterface;
