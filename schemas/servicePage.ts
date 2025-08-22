export default {
  name: 'servicePage',
  title: 'Service Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main title of the service page',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'The URL slug for this service page',
    },
    {
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      description: 'The main heading in the hero section',
    },
    {
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      description: 'The description text in the hero section',
    },
    {
      name: 'writersSectionTitle',
      title: 'Writers Section Title',
      type: 'string',
      description: 'Title for the writers section',
    },
    {
      name: 'writersSectionDescription',
      title: 'Writers Section Description',
      type: 'text',
      description: 'Description for the writers section',
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Name of the icon to use (e.g., Star, Report, Lock, Clock, Dollar, Refund)',
            },
          ],
        },
      ],
      description: 'Features/benefits of the service',
    },
    {
      name: 'pricingBase',
      title: 'Pricing Base',
      type: 'object',
      fields: [
        {
          name: 'highSchool',
          title: 'High School',
          type: 'object',
          fields: [
            { name: 'threeHours', title: '3 Hours', type: 'number' },
            { name: 'sixHours', title: '6 Hours', type: 'number' },
            { name: 'twelveHours', title: '12 Hours', type: 'number' },
            { name: 'twentyFourHours', title: '24 Hours', type: 'number' },
            { name: 'fortyEightHours', title: '48 Hours', type: 'number' },
            { name: 'threeDays', title: '3 Days', type: 'number' },
            { name: 'fiveDays', title: '5 Days', type: 'number' },
            { name: 'sevenDays', title: '7 Days', type: 'number' },
            { name: 'tenDays', title: '10 Days', type: 'number' },
            { name: 'fourteenDays', title: '14 Days', type: 'number' },
          ],
        },
        {
          name: 'college',
          title: 'College',
          type: 'object',
          fields: [
            { name: 'threeHours', title: '3 Hours', type: 'number' },
            { name: 'sixHours', title: '6 Hours', type: 'number' },
            { name: 'twelveHours', title: '12 Hours', type: 'number' },
            { name: 'twentyFourHours', title: '24 Hours', type: 'number' },
            { name: 'fortyEightHours', title: '48 Hours', type: 'number' },
            { name: 'threeDays', title: '3 Days', type: 'number' },
            { name: 'fiveDays', title: '5 Days', type: 'number' },
            { name: 'sevenDays', title: '7 Days', type: 'number' },
            { name: 'tenDays', title: '10 Days', type: 'number' },
            { name: 'fourteenDays', title: '14 Days', type: 'number' },
          ],
        },
        {
          name: 'university',
          title: 'University',
          type: 'object',
          fields: [
            { name: 'threeHours', title: '3 Hours', type: 'number' },
            { name: 'sixHours', title: '6 Hours', type: 'number' },
            { name: 'twelveHours', title: '12 Hours', type: 'number' },
            { name: 'twentyFourHours', title: '24 Hours', type: 'number' },
            { name: 'fortyEightHours', title: '48 Hours', type: 'number' },
            { name: 'threeDays', title: '3 Days', type: 'number' },
            { name: 'fiveDays', title: '5 Days', type: 'number' },
            { name: 'sevenDays', title: '7 Days', type: 'number' },
            { name: 'tenDays', title: '10 Days', type: 'number' },
            { name: 'fourteenDays', title: '14 Days', type: 'number' },
          ],
        },
        {
          name: 'phd',
          title: 'PhD',
          type: 'object',
          fields: [
            { name: 'threeHours', title: '3 Hours', type: 'number' },
            { name: 'sixHours', title: '6 Hours', type: 'number' },
            { name: 'twelveHours', title: '12 Hours', type: 'number' },
            { name: 'twentyFourHours', title: '24 Hours', type: 'number' },
            { name: 'fortyEightHours', title: '48 Hours', type: 'number' },
            { name: 'threeDays', title: '3 Days', type: 'number' },
            { name: 'fiveDays', title: '5 Days', type: 'number' },
            { name: 'sevenDays', title: '7 Days', type: 'number' },
            { name: 'tenDays', title: '10 Days', type: 'number' },
            { name: 'fourteenDays', title: '14 Days', type: 'number' },
          ],
        },
      ],
      description: 'Base pricing configuration for different academic levels and deadlines',
    },
    {
      name: 'statistics',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              title: 'Value',
              type: 'string',
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
            },
          ],
        },
      ],
      description: 'Statistics to display (e.g., years of experience, number of experts, etc.)',
    },
    {
      name: 'testimonialsTitle',
      title: 'Testimonials Title',
      type: 'string',
      description: 'Title for the testimonials section',
    },
    {
      name: 'samplesTitle',
      title: 'Samples Title',
      type: 'string',
      description: 'Title for the samples section',
    },
    {
      name: 'samplesDescription',
      title: 'Samples Description',
      type: 'text',
      description: 'Description for the samples section',
    },
    {
      name: 'samples',
      title: 'Samples',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'pages',
              title: 'Pages',
              type: 'number',
            },
            {
              name: 'level',
              title: 'Academic Level',
              type: 'string',
            },
            {
              name: 'type',
              title: 'Document Type',
              type: 'string',
            },
            {
              name: 'citation',
              title: 'Citation Style',
              type: 'string',
            },
            {
              name: 'file',
              title: 'File Path',
              type: 'string',
              description: 'Path to the sample file',
            },
          ],
        },
      ],
      description: 'Sample documents to display',
    },
    {
      name: 'faq',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'text',
            },
          ],
        },
      ],
      description: 'Frequently asked questions for this service',
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description: 'SEO meta description for the page',
    },
    {
      name: 'metaKeywords',
      title: 'Meta Keywords',
      type: 'string',
      description: 'SEO meta keywords for the page',
    },
  ],
};