import cloudinary from 'cloudinary';
import { fileUpload } from '../../helpers/fileUpload';

cloudinary.config({
  cloud_name: 'dzhmdjkld',
  api_key: '756822654666922',
  api_secret: 'uynojDJ2JnXvuPwYu9F0_yc5ll8',
  secure: true,
});

describe('Pruebas en fileUpload', () => {
  test('debe de cargar un archivo y retornar el URL', async () => {
    const resp = await fetch(
      'https://cdn.drawception.com/images/panels/2012/7-3/mANhfHHzqN-10.png'
    );
    const blob = await resp.blob();

    const file = new File([blob], 'foto.png');
    const url = await fileUpload(file);
    expect(typeof url).toBe('string');

    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.png', '');
    const { deleted } = await cloudinary.v2.api.delete_resources(imageId);
    expect(deleted).toEqual({ [imageId]: 'deleted' });
  });
});
