export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:response', (response, { event }) => {
    if ((response.statusCode ?? 200) >= 400 || event.path.startsWith('/__nuxt_error')) {
      response.headers ??= {};
      response.headers['x-robots-tag'] = 'noindex, nofollow';
    }
  });
});
