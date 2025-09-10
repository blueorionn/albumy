<?php ob_start(); ?>

<section class="w-full py-4">
    <div class="max-w-screen-xl mx-auto px-4">
        <div class="my-8 w-full flex flex-wrap gap-16">
            <?php foreach ($albums as $album): ?>
                <a href="/album/<?= $album['id'] ?>" class="max-w-[35rem] grid grid-cols-2 gap-4 group transition-all">
                    <div>
                        <img src="/assets/<?= str_replace(' ', '-', strtolower($album['title'])) ?>.jpg" alt="<?= $album['title'] ?>" class="h-auto w-full aspect-auto" />
                    </div>
                    <div>
                        <h1 class="text-2xl my-2 text-gray-800 font-semibold group-hover:underline"><?= $album['title'] ?></h1>
                        <!-- Singer -->
                        <div class="w-full flex items-center gap-1.5 my-1 flex-wrap">
                            <span class="text-base text-gray-500 block">Singer:</span>
                            <span class="text-base text-gray-500 block"><?= $album['singer'] ?></span>
                        </div>
                        <!-- Director -->
                        <div class="w-full flex items-center gap-1.5 my-1 flex-wrap">
                            <span class="text-base text-gray-500 block">Director:</span>
                            <span class="text-base text-gray-500 block"><?= empty($album['director']) ? '-' : $album['director'] ?></span>
                        </div>
                        <!-- Duration -->
                        <div class="w-full flex items-center gap-1.5 my-1 flex-wrap">
                            <span class="text-base text-gray-500 block">Duration:</span>
                            <span class="text-base text-gray-500 block"><?= $album['duration'] ?></span>
                        </div>
                        <!-- Genre -->
                        <div class="w-full flex items-center gap-1.5 my-1 flex-wrap">
                            <span class="text-base text-gray-500 block">Genre:</span>
                            <span class="text-base text-gray-500 block"><?= $album['genre'] ?></span>
                        </div>
                        <!-- Publication Year -->
                        <div class="w-full flex items-center gap-1.5 my-1 flex-wrap">
                            <span class="text-base text-gray-500 block">Publication Year:</span>
                            <span class="text-base text-gray-500 block"><?= $album['publication_year'] ?></span>
                        </div>
                        <!-- Publisher -->
                        <div class="w-full flex items-center gap-1.5 my-1 flex-wrap">
                            <span class="text-base text-gray-500 block">Publisher:</span>
                            <span class="text-base text-gray-500 block"><?= $album['publisher'] ?></span>
                        </div>
                    </div>
                </a>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<?php
$title = 'Music App | Home';
$content = ob_get_clean();
include __DIR__ . '/layout.php';
?>