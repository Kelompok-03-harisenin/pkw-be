'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // Seed Users
    await queryInterface.bulkInsert('Users', [
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: '$2a$10$ho2yzTqkih6VidCu8qJfLuenkef2acA20Hb6PimKOiuZlnlVdKJrm', // password123 (bcrypt 10 rounds)
        biography: 'Some bio',
        title: 'Photographer',
        profile_picture: 'https://res.cloudinary.com/de3qj7pyl/image/upload/v1720609286/default-profile-picture_qrzxus.png',
      },
      {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        password: '$2a$10$6tDQIhKYYcQQtPvQAdtqMOS7m3tvGj3tJ5.bPErX4iMDacwseYBAS', // password123 (bcrypt 10 rounds)
        biography: 'Some bio',
        title: 'Photographer',
        profile_picture: 'https://res.cloudinary.com/de3qj7pyl/image/upload/v1720609286/default-profile-picture_qrzxus.png',
      },
      {
        name: 'John Smith',
        email: 'johnSmith@example.com',
        password: '$2a$10$6tDQIhKYYcQQtPvQAdtqMOS7m3tvGj3tJ5.bPErX4iMDacwseYBAS', // password123 (bcrypt 10 rounds)
        biography: 'Some bio',
        title: 'Photographer',
        profile_picture: 'https://res.cloudinary.com/de3qj7pyl/image/upload/v1720609286/default-profile-picture_qrzxus.png',
      }
    ])

    // Seed Categories
    await queryInterface.bulkInsert('Categories', [
      {
        category_name: 'Nature',
      },
      {
        category_name: 'Wallpaper',
      },
      {
        category_name: 'Fashion',
      },
      {
        category_name: 'Street Photography',
      },
      {
        category_name: 'Travel',
      },
      {
        category_name: 'People',
      },
      {
        category_name: 'Etc',
      }
    ])

    // Seed Photos
    await queryInterface.bulkInsert('Photos', [
      {
        id_user: 1,
        id_category: 6,
        photo_url: 'https://res.cloudinary.com/de3qj7pyl/image/upload/v1718540288/cld-sample.jpg',
        title: 'Doggy',
        description: 'Cute dog'
      },
      {
        id_user: 2,
        id_category: 1,
        photo_url: 'https://res.cloudinary.com/de3qj7pyl/image/upload/v1718540255/sample.jpg',
        title: 'Flowers',
        description: 'A Beautiful flowers'
      },
      {
        id_user: 3,
        id_category: 2,
        photo_url: 'https://res.cloudinary.com/de3qj7pyl/image/upload/v1718540281/samples/balloons.jpg',
        title: 'Balloons',
        description: 'Amazing wallpapers'
      },
      {
        id_user: 1,
        id_category: 4,
        photo_url: 'https://res.cloudinary.com/de3qj7pyl/image/upload/v1718540284/samples/man-on-a-street.jpg',
        title: 'Man on bench',
        description: 'Bench sitter'
      },
      {
        id_user: 2,
        id_category: 3,
        photo_url: 'https://res.cloudinary.com/de3qj7pyl/image/upload/v1718540261/samples/ecommerce/shoes.png',
        title: 'Shoes',
        description: 'Beautiful shoes'
      },
      {
        id_user: 3,
        id_category: 5,
        photo_url: 'https://res.cloudinary.com/de3qj7pyl/image/upload/v1718540289/cld-sample-2.jpg',
        title: 'Mountains',
        description: 'Beautiful scenery'
      },
      {
        id_user: 1,
        id_category: 7,
        photo_url: 'https://res.cloudinary.com/de3qj7pyl/image/upload/v1718540257/samples/animals/cat.jpg',
        title: 'Cat',
        description: 'Meow'
      }
    ]);

    // Seed Comments
    await queryInterface.bulkInsert('Comments', [
      {
        id_photo: 1,
        id_user: 1,
        comment: 'Beautiful photo!'
      },
      {
        id_photo: 2,
        id_user: 2,
        comment: 'Amazing technology!'
      },
      {
        id_photo: 3,
        id_user: 3,
        comment: 'Beautiful photo!'
      },
      {
        id_photo: 4,
        id_user: 1,
        comment: 'Amazing technology!'
      },
      {
        id_photo: 5,
        id_user: 2,
        comment: 'Beautiful photo!'
      },
      {
        id_photo: 6,
        id_user: 3,
        comment: 'Amazing technology!'
      },
    ]);

    // Seed Likes
    await queryInterface.bulkInsert('Likes', [
      {
        id_photo: 1,
        id_user: 1
      },
      {
        id_photo: 2,
        id_user: 1,
      },
      {
        id_photo: 3,
        id_user: 1
      },
      {
        id_photo: 4,
        id_user: 1,
      },
      {
        id_photo: 1,
        id_user: 2
      },
      {
        id_photo: 1,
        id_user: 3,
      },
    ]);

  },

  async down(queryInterface, Sequelize) {
    // Reverse the seeding process
    await queryInterface.bulkDelete('Likes', null, {});
    await queryInterface.bulkDelete('Comments', null, {});
    await queryInterface.bulkDelete('Photos', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
