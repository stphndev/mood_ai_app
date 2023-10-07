import { auth } from '@clerk/nextjs';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Home() {
  const { userId } = await auth();
  let href = userId ? '/journal' : '/new-user';

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '600px',
          mx: 'auto',
        }}
      >
        <Typography variant="h3" sx={{ mb: 4, color: 'white' }}>
          The best Journal app, period.
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: 'rgba(255, 255, 255, 0.6)' }}>
          This is the best app for tracking your mood throughout your life. All you have to do is be honest.
        </Typography>
        <div>
          <Link href={href}>
            <Button variant="contained" sx={{ backgroundColor: '#3498db', fontSize: '1.6rem', color: 'white' }}>
              Get Started
            </Button>
          </Link>
        </div>
      </Box>
    </Box>
  );
}
