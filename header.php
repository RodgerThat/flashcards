<?php
/**
 * header.php
 */

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>" />
    <title><?php wp_title(); ?></title>
    <meta name="description" content="<?php bloginfo( 'description' ); ?>">
    <!-- google chrome frame support -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <!-- mobile meta -->
    <meta name="HandheldFriendly" content="True" />
    <meta name="MobileOptimized" content="320" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- stylin -->
    <link rel="profile" href="http://gmpg.org/xfn/11" />
    <link rel="shortcut icon" type="image/x-icon" href="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/favicon.ico" />
    <link rel="stylesheet" href="<?php echo get_stylesheet_uri(); ?>" type="text/css" media="screen" />
    <!-- wp_head -->
    <?php wp_head(); ?>
</head>
<body>
<div id="admin-menu">
<?php
// if user not logged in, output login form
if ( !is_user_logged_in() ) : ?>
    <form id="login" action="login" method="post">
        <h2>Loggin'</h2>
        <p class="status"></p>
        <ul>
            <li>
                <label for="username">USR</label>
                <input id="username" type="text" name="username">
            </li>
            <li>
                <label for="password">PWD</label>
                <input id="password" type="password" name="password">
            </li>
            <li>
                <input class="submit_button" type="submit" value="DO IT" name="submit">
            </li>
            <li>
                <a class="lost" href="<?php echo wp_lostpassword_url(); ?>">OH NOES i lost my pwd</a>
                <a class="close" href="">(bail)</a>
            </li>
        </ul>
        <?php wp_nonce_field( 'ajax-login-nonce', 'security' ); ?>
    </form>
<?php endif ?>
<?php if (is_user_logged_in()) { ?>
    <a class="login_button" href="<?php echo wp_logout_url( home_url() ); ?>">Logout</a>
<?php } else { ?>
    <a class="login_button" id="show_login" href="">Login</a>
<?php } ?>
<?php if (is_user_logged_in()) : ?>
    <a class="add_new_card_button" href="">Add New Card</a>
    <a class="add_new_group_button" href="">Add New Group</a>
<?php endif; ?>
<?php if (is_user_logged_in()) : ?>
    <form id="add_new_card" action="add_new_card" method="post">
        <h2>Add New Card</h2>
        <p class="status"></p>
        <ul>
            <li>
                <label for="card_title">Card Title</label>
                <input id="card_title" type="text" name="card_title">
            </li>
            <li>
                <label for="card_group">Card Group</label>
                <select id="card_group" name="card_group">
                    <option value="none" selected="selected">None</option>
                    <?php $groups = get_groups();
                    foreach ( $groups as $group ) {
                        echo '<option class="select-group '.$group->slug.'" data-termSlug="'.$group->slug.'">'.$group->name.'</option>';
                    }
                    ?>
                </select>
            </li>
            <li>
                <input id="add_new_card_submit" class="submit_button" type="submit" value="DO IT" name="add_new_card">
                <a class="close" href="">(bail)</a>
            </li>
        </ul>
    </form>
<?php endif; ?>
</div>
<header>

    <nav id="main-nav">
        <?php fc_generate_menu() ?>
    </nav>
</header>


