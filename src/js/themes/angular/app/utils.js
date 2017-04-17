(function() {
  'use strict';
  //// Initialize Firebase.
  //// TODO: replace with your Firebase project configuration.
  var config = {
    apiKey: "AIzaSyBudG45_yT09bxKTbipdm42tgqWD8SF9WM",
    authDomain: "thinkcode-37132.firebaseapp.com",
    databaseURL: "https://thinkcode-37132.firebaseio.com"
  };
  var firebaseApp = firebase.initializeApp(config);
  var firepadRefs = firebase.database().ref('firepadInstances');
  // firebase.database.enableLogging(true);
  angular.module('utils', [])
    .factory('Utils', [function() {
      return {
        firebaseApp: firebaseApp,
        firepadRefs: firepadRefs
      };
    }])
    .filter('moment', function() {
      return function(string, format) {
        if (string && moment(string).isValid()) {
          return moment(string).format(format);
        } else {
          return string;
        }
      };
    })
    .filter('fromNow', function() {
      return function(string, notSuffixed) {
        if (moment(string).isValid()) {
          // if (isSuffixed === true) {
          //   return moment(string).fromNow(true);
          // } else {
          return moment(string).fromNow(notSuffixed);
          // }
        } else {
          return string;
        }
      };
    })
    .filter('fromNowForChat', function() {
      return function(string, notSuffixed) {
        if (moment(string).isValid()) {
          if (moment().diff(string, 'hours', true) < 1) {
            return moment(string).fromNow(notSuffixed);
          } else if (moment().diff(string, 'hours', true) < 24) {
            return moment(string).calendar();
          } else if (moment().diff(string, 'days') < 7) {
            return moment(string).format('dddd HH:mm');
          } else {
            return moment(string).format('DD/MM/YYYY HH:mm');
          }
        } else {
          return string;
        }
      };
    })
    .filter('courseStatus', function() {
      return function(string) {
        if (string === 'draft') {
          return 'Bản nháp';
        } else if (string === 'reviewing') {
          return 'Đang kiểm tra';
        } else if (string === 'published') {
          return 'Đã được duyệt';
        } else {
          return string;
        }
      };
    })
    .filter('badgeImage', function() {
      return function(badge_id, badge_arr) {
        var result = badge_arr.find(function(item) {
          return item.id === badge_id;
        });
        if (result) {
          return result.image;
        } else {
          return '';
        }
      };
    })
    .filter('existedInArray', function() {
      return function(item, arr) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].id === item.id) {
            return true;
          }
        }
        return false;
      };
    })
    .filter('lessonType', function() {
      return function(lessonType) {
        switch (lessonType) {
          case 'video':
            return 'Bài giảng';
          case 'reading':
            return 'Bài đọc';
          case 'code':
            return 'Bài thực hành';
          case 'project':
            return 'Bài tập lớn';
        }
      };
    })
    .filter('lessonTypeClass', function() {
      return function(lessonType, predicate) {
        switch (lessonType) {
          case 'video':
            return predicate === 'bgColor' ? 'red' : 'film';
          case 'reading':
            return predicate === 'bgColor' ? 'indigo' : 'book';
          case 'code':
            return predicate === 'bgColor' ? 'pink' : 'code';
          case 'project':
            return predicate === 'bgColor' ? 'orange' : 'desktop';
        }
      };
    })
    .filter('getYoutubeVideoId', function() {
      return function(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
      };
    })
    .filter('trusted', function($sce) {
      return function(url) {
        return $sce.trustAsResourceUrl(url);
      };
    })
    .filter("trustHtml", ['$sce', function($sce) {
      return function(htmlCode) {
        return $sce.trustAsHtml(htmlCode);
      };
    }])
    .filter('filterConversation', function() {
      return function(arr) {
        if (!arr) {
          return [];
        } else {
          return arr.filter(function(item) {
            return item.isInvolved && item.messages;
          });
        }
      };
    })
    .filter('msgSummary', function() {
      return function(messages) {
        var keys = Object.keys(messages);
        return messages[keys[keys.length - 1]].message;
      };
    })
    .filter('capitalize', function() {
      return function(input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
      };
    })
    .filter('avatar', function(API_URL, $http) {
      var cached = {};
      var adorableApiUrl = 'https://api.adorable.io/avatars/40/',
        cloudfrontApiUrl = 'http://d2a6eak7d6dhlh.cloudfront.net/users/';

      function getAvatar(userId) {
        // console.log('details for github user', userId, field);
        if (userId) {
          if (userId in cached) {
            // avoid returning a promise!
            return typeof cached[userId].then !== 'function' ? cached[userId] : undefined;
          } else {
            cached[userId] = $http({
              method: 'GET',
              url: API_URL + '/users/' + userId + '/avatar'
            }).then(function(res) {
              cached[userId] = res.data.preview.length ? res.data.preview : adorableApiUrl + userId + '.png';
              // console.log('generated result for', info);
            });
          }
        }
      }
      getAvatar.$stateful = true;
      return getAvatar;
    })
    .filter('isRecentMsg', function() {
      return function(curMsg, prevMsg) {
        if (prevMsg && curMsg.user_id == prevMsg.user_id && moment(curMsg.datetime).diff(prevMsg.datetime, 'seconds') < 30) {
          return true;
        }
        return false;
      };
    });

  angular.module('app').filter('findBranchByUid', function() {
    return function(list, uid) {
      return list.filter(function(l) {
        if (uid === l.uid) {
          return true;
        }
      });
    };
  });
}());
