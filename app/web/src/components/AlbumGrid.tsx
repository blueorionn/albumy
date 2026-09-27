import { ArrowRight } from 'lucide-react'
import { cx } from '../lib/cx'
import { eyebrow, sectionHeading, sectionTitle, seeAll } from '../lib/ui'
import type { Album, AlbumType } from '../types'
import Cover from './Cover'

interface AlbumGridProps {
  albums: Album[]
}

const TYPE_LABELS: Record<AlbumType, string> = {
  album: 'Album',
  ep: 'EP',
  single: 'Single',
  compilation: 'Compilation',
}

/** "Recently added — Albums": static browse cards (albums aren't playable yet). */
export default function AlbumGrid({ albums }: AlbumGridProps) {
  return (
    <section className='mb-[45px]'>
      <div className={sectionHeading}>
        <div>
          <p className={cx(eyebrow, 'mb-2 ml-0')}>Recently added</p>
          <h2 className={sectionTitle}>Albums</h2>
        </div>
        <button type='button' className={seeAll}>
          See all <ArrowRight size={15} />
        </button>
      </div>

      <div className='grid grid-cols-4 gap-[18px] max-lg:grid-cols-2 max-sm:gap-[11px]'>
        {albums.map((album) => (
          <article
            key={album.id}
            className='group bg-elevated hover:bg-elevated-hover relative rounded-[11px] border border-[#252825] p-2.5 transition duration-200 hover:-translate-y-[3px]'
          >
            <div className='relative aspect-square overflow-hidden rounded-[7px]'>
              <Cover
                cover={album.cover}
                title={album.title}
                artist={album.artist}
                className='block h-full w-full'
              />
            </div>
            <div className='flex flex-col gap-[5px] px-[3px] pt-[13px] pb-[5px]'>
              <strong className='text-xs font-bold'>{album.title}</strong>
              <span className='text-[11px] text-[#7c847c]'>{album.artist}</span>
            </div>
            <span className='absolute right-[13px] bottom-[17px] text-[10px] text-[#6d756d] max-sm:hidden'>
              {TYPE_LABELS[album.album_type]}
            </span>
          </article>
        ))}
      </div>
    </section>
  )
}
