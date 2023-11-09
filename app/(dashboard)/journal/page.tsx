import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { Link, Box, Typography, Grid } from '@mui/joy'
import EntryCard from '@/components/EntryCard'
import NewEntryCard from '@/components/NewEntryCard'
import Question from '@/components/Question'
import { db } from '@/drizzle/db'
import { journalEntries } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

const getEntries = async () => {
  const user = await getUserFromClerkID()

  const entries = await db
    .select()
    .from(journalEntries)
    .where(eq(journalEntries.userId, user[0].id))

  return entries
}

// export const dummyEntries = [
//   { id: 1, createdAt: '2023-10-10', summary: 'Dummy Entry 1', mood: 'Happy' },
//   { id: 2, createdAt: '2023-10-11', summary: 'Dummy Entry 2', mood: 'Sad' },
//   { id: 3, createdAt: '2023-10-12', summary: 'Dummy Entry 3', mood: 'Excited' },
//   { id: 4, createdAt: '2023-10-13', summary: 'Dummy Entry 4', mood: 'Calm' },
// ];

const JournalPage = async () => {
  const entries = await getEntries()

  return (
    <Box
      sx={{
        p: 10,
        backgroundColor: 'rgba(173, 216, 230, 0.1)',
        height: '100%',
      }}
    >
      <Typography level='h4'>Journal</Typography>
      <Box>
        <Question />
      </Box>
      <Grid container spacing={2}>
        <Grid xs={6}>
          <NewEntryCard />
        </Grid>
          {entries.map((entry) => (
            <Grid key={entry.id} xs={6}>
              <Link href={`/journal/${entry.id}`}>
                <p style={{ textDecoration: 'none' }}>
                  <EntryCard entry={entry} />
                </p>
              </Link>
            </Grid>
          ))}
        </Grid>
    </Box>
  )
}

export default JournalPage
