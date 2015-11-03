function ReviewController() {
  this.location = "";

  this.ShowReviewModal = ShowReviewModal;
  this.HideReviewModal = HideReviewModal;
  this.GetReviews = GetReviews;
  this.PostReview = PostReview;
}

function ShowReviewModal(location) {
  $("#reviewModal").modal('show');
  this.GetReviews(location);
};

function HideReviewModal() {
  $(this.modal).modal('hide');
  $("#reviewModal").modal('hide');
};

function GetReviews(location) {
  var data = {
    location: location,
    theme: locationsController.theme
  };
  this.location = location;
  var url = "/api/locations/reviews/get";

  $("#reviewModalLabel").html(location);
  $.post(url, data, function (res) {
    if (res.length < 1) {
      var text = "<h4>No reviews for this location yet. Add yours!</h4>";
      $("#reviews").html(text);
      console.log("There are no reviews");
    }
    else generateReviewHTML(res);
  });
};

function PostReview(review) {
  var that = this;
  var data = {
    name: userController.user.name,
    location: this.location,
    theme: locationsController.theme,
    review: review
  }

  var url = '/api/locations/reviews';
  $.post(url, data, function(res) {
    if (res.success) {
      that.GetReviews(data.location);
      $("#inputReview").val('');
    }
  });
};

function generateReviewHTML(reviews) {
  var HTML = "";
  reviews.forEach(function(review, index) {
    var content = '<p>'+review.review+'</p>';
    var source = '<footer><cite title="Source Title">'+review.name+'</cite></footer>';
    HTML += '<blockquote>'+content+source+'</blockquote>';
  });
  $("#reviews").html(HTML);
};
