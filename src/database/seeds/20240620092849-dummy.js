'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      // Seed Users
      await queryInterface.bulkInsert('Users', [
        {
          name: 'John Doe',
          email: 'john.doe@example.com',
          password: '$2a$10$ho2yzTqkih6VidCu8qJfLuenkef2acA20Hb6PimKOiuZlnlVdKJrm', // password123 (bcrypt 10 rounds)
          biography: 'Some bio',
          title: 'Photographer'
        },
        {
          name: 'Jane Doe',
          email: 'jane.doe@example.com',
          password: '$2a$10$6tDQIhKYYcQQtPvQAdtqMOS7m3tvGj3tJ5.bPErX4iMDacwseYBAS', // password123 (bcrypt 10 rounds)
          biography: 'Some bio',
          title: 'Photographer'
        }
      ])

      // Seed Categories
      await queryInterface.bulkInsert('Categories', [
        {
          category_name: 'Nature',
        },
        {
          category_name: 'Technology',
        }
      ])

      // Seed Photos
      await queryInterface.bulkInsert('Photos', [
        {
          id_user: 1,
          id_category: 1,
          photo_url: 'http://example.com/photo1.jpg',
        },
        {
          id_user: 1,
          id_category: 2,
          photo_url: 'http://example.com/photo2.jpg',
        },
        {
          id_user: 2,
          id_category: 1,
          photo_url: 'http://example.com/photo3.jpg',
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
          comment: 'Amazing technology!'        }
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
        }
      ]);

  },

  async down (queryInterface, Sequelize) {
    // Reverse the seeding process
    await queryInterface.bulkDelete('Likes', null, {});
    await queryInterface.bulkDelete('Comments', null, {});
    await queryInterface.bulkDelete('Photos', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
