<template>
  <div class="container">
    <div v-for="book in books" :key="book.id" class="cards">
      <div class="card-item">
        <div class="card-image">
          <img
            src="https://www.goodreads.com/api/reviews_widget_iframe?did=21508&format=html&header_text=Goodreads+Reviews&isbn={{book.isbn}}&links=660&min_rating=&num_reviews=&review_back=ffffff&stars=000000&stylesheet=&text=444"
          />
        </div>
        <div class="card-info">
          <h2 class="card-title">{{ book.title }}</h2>
          <p class="card-intro">
            {{ book.authors }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import books from './books.json';

export default {
  data() {
    return {
      Books: books,
    };
  },
};
</script>
<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css?family=Raleway');

// Colors
@dark-blue: #32325d;
@gray: #f8f8f8;

// Mobile first
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  background-color: @gray;
}

body {
  padding: 2rem 0.5rem;
  font-family: 'Raleway', Sans-serif;
  color: @dark-blue;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  margin: 0;
  @media (min-width: 40rem) {
    padding: 2rem;
  }
}

//Flex container
.container {
  display: flex;
  -webkit-display: box;
  -moz-display: box;
  -ms-display: flexbox;
  -webkit-display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
}

// Cards
.cards {
  display: flex;
  padding: 1rem;
  margin-bottom: 2rem;
  width: 100%;
  @media (min-width: 40rem) {
    width: 50%;
  }
  @media (min-width: 56rem) {
    width: 33.3%;
  }

  .card-item {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    width: 100%;
    border-radius: 6px;
    box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    transition: transform 0.5s;
    -webkit-transition: transform 0.5s;

    &:hover {
      cursor: pointer;
      transform: scale(1.1);
      -webkit-transform: scale(1.1);
      .card-image {
        opacity: 1;
      }
    }
  }

  // Content
  .card-info {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    padding: 1rem;
    line-height: 1.5em;
  }

  .card-title {
    font-size: 25px;
    line-height: 1.1em;
    color: #32325d;
    margin-bottom: 0.2em;
  }

  // Images
  .card-image {
    height: 200px;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 6px 6px 0px 0px;
    opacity: 0.91;
  }
}
</style>
