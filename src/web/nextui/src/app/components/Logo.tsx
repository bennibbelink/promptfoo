import Box from '@mui/material/Box';
import Image from 'next/image';
import Link from 'next/link';
import { getApiBaseUrl } from '@/api';
import './Logo.css';
import { useEffect, useState } from 'react';

export default function Logo() {

  const [logoUrl, setLogoUrl] = useState('/logo-panda.svg')

  useEffect(() => {
      makeUrl();
  }, []);

  const makeUrl = async () => {
    const apiBaseUrl = await getApiBaseUrl();
    setLogoUrl(apiBaseUrl + '/logo-panda.svg')
  }

  return (
    <Link href="https://promptfoo.dev" passHref>
      <Box className="logo" component="a">
        <Image width={25} height={25} src={logoUrl} alt="Promptfoo logo" />{' '}
        <span>promptfoo</span>
      </Box>
    </Link>
  );
}
