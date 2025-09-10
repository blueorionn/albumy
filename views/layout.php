<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $title ?? 'Music App' ?></title>
    <meta name="description" content="<?= $description ?? 'Music Album Collection Site' ?>">
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>

<body>
    <header class="py-6">
        <nav class="bg-white border-gray-200 px-4 lg:px-6 py-4">
            <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <a href="/" class="flex items-center gap-2.5">
                    <ion-icon name="musical-notes"></ion-icon>
                    <span class="self-center text-xl font-semibold whitespace-nowrap">AlbumCollection</span>
                </a>
                <div class="flex items-center lg:order-2">
                    <?php if (!isset($_SESSION['user'])): ?>
                        <a href="/auth/login" class="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">Log in</a>
                    <?php endif; ?>
                </div>
            </div>
        </nav>
    </header>
    <main>
        <?= $content ?>
    </main>

    <!-- Ionicons -->
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
</body>

</html>