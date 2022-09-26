const queue = require('../config/kue');
const commentsMailer = require('../mailers/comment_mailer');

queue.process('email', function(job, done){
    console.log("Email worker is processing a job "+job.data);
    commentsMailer.newComment(job.data);
    done();
});

